import requests
import json
import enum
import dateutil.parser
import parse
from typing import Dict, Tuple, NamedTuple, Collection, Optional
from datetime import datetime

EVENT_REQUEST = """
SELECT ?occurrence ?article ?occurrenceLabel ?coordinate_location ?point_in_time ?start_time ?end_time ?location ?locationLabel WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  ?occurrence (wdt:P31/wdt:P279*) wd:Q178561.
  { ?occurrence wdt:P625 ?coordinate_location. }
  OPTIONAL { ?occurrence wdt:P585 ?point_in_time. }
  OPTIONAL { ?occurrence wdt:P580 ?start_time. }
  OPTIONAL { ?occurrence wdt:P582 ?end_time. }
  OPTIONAL { ?occurrence wdt:P276 ?location. }
}
LIMIT 100
"""
EVENT_REQUEST_WITH_SITELINKS = """
SELECT ?occurrence ?siteLink ?occurrenceLabel ?coordinate_location ?point_in_time ?start_time ?end_time ?location ?locationLabel WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  ?occurrence (wdt:P31/wdt:P279*) wd:Q178561.
  { ?occurrence wdt:P625 ?coordinate_location. }
  OPTIONAL { ?occurrence wdt:P585 ?point_in_time. }
  OPTIONAL { ?occurrence wdt:P580 ?start_time. }
  OPTIONAL { ?occurrence wdt:P582 ?end_time. }
  OPTIONAL { ?occurrence wdt:P276 ?location. }
  ?siteLink schema:about ?occurrence.
}
"""


def get_from_wikidata(sparql_query: str) -> Dict[str, Dict]:
    x = requests.get(
        "https://query.wikidata.org/sparql?format=json&query={}".format(
            sparql_query
        )
    ).json()
    return x


class MyDate(NamedTuple):
    year: int
    month: int
    day: int

    def serialise(self) -> int:
        return (
            10000*self.year +
            100*self.month +
            self.day
        )


def parse_iso_mydate(iso_date: str) -> MyDate:
    year_multiplier = 1
    if iso_date[0] == '-':
        iso_date = iso_date[1:]
        year_multiplier = -1
    split_date = iso_date.split('-')
    return MyDate(
        year=int(split_date[0])*year_multiplier,
        month=int(split_date[1]),
        day=int(split_date[2].split('T')[0])
    )


def parse_from_coordinate(coordinate: str) -> Optional[Tuple[float, float]]:
    parse_result = parse.parse("Point({long} {lat})", coordinate)
    if parse_result is None:
        return None
    return (
        float(parse_result['long']),
        float(parse_result['lat'])
    )


class Event_Type(enum.Enum):
    WIKIDATA_OCCURRENCE = 1


class Event(object):
    def __init__(
        self,
        title: str,
        coordinates: Optional[Tuple[float, float]],
        start_time: Optional[MyDate],
        end_time: Optional[MyDate],
        date: Optional[MyDate],
        event_type: Event_Type,
        links: Collection[str]
    ) -> None:
        self.title = title
        self.coordinates = coordinates
        self.start_time = start_time
        self.end_time = end_time
        self.date = date
        self.event_type = event_type
        self.links = links

    def has_date(self) -> bool:
        return (
            (self.start_time is not None and
             self.end_time is not None) or
            self.date is not None
        )

    def clean_title_and_links(self):
        link = self.links[0]
        for l in self.links:
            if 'en.wikipedia' in l:
                link = l
                break  # favour English
            if 'fr.wikipedia' in l:
                link = l
            if 'es.wikipedia' in l:
                link = l
            if 'de.wikipedia' in l:
                link = l
        self.links = [link]
        # Clean titles in the format Q12345
        if [i for i in self.title if not i.isdigit()][0] == 'Q':
            self.title = link.split('/')[-1]

    def to_dict(self) -> Dict:
        if self.date is not None:
            date = self.date.serialise()
            start_time = date
            end_time = date
        elif self.start_time is not None and self.end_time is not None:
            start_time = self.start_time.serialise()
            end_time = self.end_time.serialise()
        else:
            raise ValueError('Event.to_dict: Event has no date')
        if self.coordinates is not None:
            longitude, latitude = self.coordinates
        else:
            raise ValueError('Event.to_dict: Event has no coordinates')

        return {
            'title': self.title,
            'longitude': longitude,
            'latitude': latitude,
            'start_time': start_time,
            'end_time': end_time,
            'links': self.links
        }


def events_to_json(evts: Collection[Event]) -> str:
    out = []
    for e in evts:
        if not e.has_date():
            continue
        if not e.coordinates:
            continue
        out.append(e.to_dict())
    return json.dumps(out)


def get_wikidata_events() -> Collection[Event]:
    occurrences = get_from_wikidata(EVENT_REQUEST_WITH_SITELINKS)['results']['bindings']
    out_dict: Dict[str, Event]
    out_dict = {}
    for o in occurrences:
        # event: Optional[Event]
        event = out_dict.get(
            o['occurrence']['value'],
            None
        )
        if event is not None:
            event.links.append(o['siteLink']['value'])
            continue
        out_dict[o['occurrence']['value']] = Event(
            title=o['occurrenceLabel']['value'],
            coordinates=parse_from_coordinate(
                o['coordinate_location']['value']
            ),
            start_time=(
                parse_iso_mydate(o.get('start_time')['value'])
                if o.get('start_time') else None
            ),
            end_time=(
                parse_iso_mydate(o.get('end_time')['value'])
                if o.get('end_time') else None
            ),
            date=(
                parse_iso_mydate(o.get('point_in_time')['value'])
                if o.get('point_in_time') else None
            ),
            event_type=Event_Type.WIKIDATA_OCCURRENCE,
            links=[o['siteLink']['value']]
        )
    for e in out_dict.values():
        e.clean_title_and_links()
    return out_dict.values()

print(events_to_json(get_wikidata_events()))
# events_to_json(get_wikidata_events())
# print(get_from_wikidata(EVENT_REQUEST)['results']['bindings'])
