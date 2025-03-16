import csv
import json

def make_json(csvFilePath, jsonFilePath):
    # Create a list to hold rows
    data = []
    
    # Open a CSV reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        
        # Append each row as a dictionary to the list
        for rows in csvReader:
            data.append(rows)

    # Open a JSON writer, and use the json.dumps() 
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
        
# Driver Code

# Define the file paths according to your system

file_name = 'test_pieces'

csvFilePath = f'/Users/matthewsenick/Github/ukrainian-chamber-music-encyclopedia/public/{file_name}.csv'
jsonFilePath = f'/Users/matthewsenick/Github/ukrainian-chamber-music-encyclopedia/public/{file_name}.json'

# Call the make_json function
make_json(csvFilePath, jsonFilePath)
