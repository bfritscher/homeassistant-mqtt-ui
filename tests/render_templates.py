"""Render generated MQTT templates with Jinja, without any HA entity state."""

import json
import math
import sys

from jinja2 import StrictUndefined
from jinja2.sandbox import ImmutableSandboxedEnvironment


def is_number(value):
    # Match Home Assistant's numeric check, including rejection of NaN/infinity.
    try:
        return math.isfinite(float(value))
    except (TypeError, ValueError):
        return False


env = ImmutableSandboxedEnvironment(undefined=StrictUndefined)
env.globals["is_number"] = is_number
results = []
for case in json.load(sys.stdin):
    context = {"value_json": case["payload"]} if "payload" in case else {}
    if "this" in case:
        context["this"] = case["this"]
    results.append(env.from_string(case["template"]).render(context).strip())
json.dump(results, sys.stdout)
