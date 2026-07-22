import json
import os

STATS_FILE = "app/metadata/stats.json"


def get_stats():

    if not os.path.exists(STATS_FILE):

        os.makedirs(os.path.dirname(STATS_FILE), exist_ok=True)

        with open(STATS_FILE, "w") as f:
            json.dump({"queries": 0}, f)

    with open(STATS_FILE, "r") as f:
        return json.load(f)


def increment_queries():

    stats = get_stats()

    stats["queries"] += 1

    with open(STATS_FILE, "w") as f:
        json.dump(stats, f, indent=4)

    return stats