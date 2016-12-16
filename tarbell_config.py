# -*- coding: utf-8 -*-

"""
Tarbell project configuration
"""
from flask import Blueprint, g
import datetime
import xlrd.xldate


blueprint = Blueprint('crane-construnction-projects', __name__)
@blueprint.app_template_filter('xldate_to_datetime')
def xldate_to_datetime(xldate):
    if isinstance(xldate, unicode):
        retval = datetime.datetime.strptime(xldate, '%m/%d/%Y')
    else:
        retval = xlrd.xldate.xldate_as_datetime(xldate, 0)
    return retval

@blueprint.app_template_filter('format_vote_date')
def format_vote_date(date_to_format, format):
    return date_to_format.strftime(format)


# Google spreadsheet key
SPREADSHEET_KEY = "1xxFZUo1LrmiEa5YaUw4OiHt3Kysnt57-22y1YBe9YLw"

# Exclude these files from publication
EXCLUDES = ['*.md', 'requirements.txt', 'node_modules', 'sass', 'js/src', 'package.json', 'Gruntfile.js']

# Spreadsheet cache lifetime in seconds. (Default: 4)
# SPREADSHEET_CACHE_TTL = 4

# Create JSON data at ./data.json, disabled by default
# CREATE_JSON = True

# Get context from a local file or URL. This file can be a CSV or Excel
# spreadsheet file. Relative, absolute, and remote (http/https) paths can be 
# used.
# CONTEXT_SOURCE_FILE = ""

# EXPERIMENTAL: Path to a credentials file to authenticate with Google Drive.
# This is useful for for automated deployment. This option may be replaced by
# command line flag or environment variable. Take care not to commit or publish
# your credentials file.
# CREDENTIALS_PATH = ""

# S3 bucket configuration
S3_BUCKETS = {
    # Provide target -> s3 url pairs, such as:
    #     "mytarget": "mys3url.bucket.url/some/path"
    # then use tarbell publish mytarget to publish to it
    
    "production": "graphics.chicagotribune.com/crane-construction-projects-chicago",
    "staging": "apps.beta.tribapps.com/crane-construction-projects-chicago",
}

# Default template variables
DEFAULT_CONTEXT = {
    'name': 'crane-construction-projects-chicago',
    'title': 'Crane Construction Projects in Chicago'
}