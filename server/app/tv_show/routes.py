import requests
from flask import jsonify, request

from app.tv_show import bp
from config import Config

@bp.route('/tv-shows/popular', methods=['GET'])
def get_popular_shows():
    token = Config.ACCESS_TOKEN
    params = {
        "language": request.args.get('language', 'en-US'),
        "page": request.args.get('page', 1),
        "sort_by": request.args.get('sort_by', 'popularity.desc'),
        "include_adult": request.args.get('include_adult', 'false'),
        "first_air_date_year": request.args.get('first_air_date_year', None),
        "with_genres": request.args.get('with_genres', None),
        "include_null_first_air_dates": request.args.get('include_null_first_air_dates', 'false')
    }
    
    # Extract additional date parameters
    first_air_date_gte = request.args.get('first_air_date_gte', None)
    first_air_date_lte = request.args.get('first_air_date_lte', None)
    
    # Add the date parameters to the params dictionary if they are provided
    if first_air_date_gte:
        params["first_air_date.gte"] = first_air_date_gte
    if first_air_date_lte:
        params["first_air_date.lte"] = first_air_date_lte
    
    url = "https://api.themoviedb.org/3/discover/tv"
    
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {token}"
    }
    
    # Filter out None values from params dictionary
    filtered_params = {k: v for k, v in params.items() if v is not None}
    
    response = requests.get(url, headers=headers, params=filtered_params)
    
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Unable to fetch data from TMDb"}), response.status_code