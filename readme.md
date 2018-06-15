## Sorting
#### Start
```npm install```

```npm start```

open in browser: ``http://localhost:8080/api-docs/`` to load swagger UI

You will need to pass a proper whitelisted auth header in order to call sorting endpoints

## Authorization
Pass in header:
Header {name: value}: ``X-API-KEY: X-SORTING-CODE``

To do so in the Swagger UI click button "Authorize" and enter value ``X-SORTING-CODE``. Confirm. Now you are authorized to call the sorting endpoints.

## Example call

```
curl -X POST "http://localhost:8080/api/v2/bubbleSort" -H "accept: application/json" -H "X-API-KEY: X-SORTING-CODE" -H "Content-Type: application/json" -d "{ \"unsortedNumbers\": [ 0, 3, 12, 54, -54, -67, -324, 324, 26, -67, -23, 56, 89, 23 ]}"
```

## Example response
```
{
  "type": "bubble",
  "result": [
    -324,
    -67,
    -67,
    -54,
    -23,
    0,
    3,
    12,
    23,
    26,
    54,
    56,
    89,
    324
  ],
  "size": 14
}
```

## Edge cases
#### Bubble sort
Bubble sort is slower than the other O(n2) sorts; it's about four times as slow as insertion sort and twice as slow as selection sort. It does have good best-case behavior, but is impractically slow on almost all real data sets. Any good implementation of quicksort, heapsort, or mergesort is likely to outperform it by a wide margin.

#### General edge cases
- API accepts array of numbers in the body of the request with property name "unsortedNumbers"
- Sorting algorithm assumes the data is valid and contains no garbage: (i.e. no strings, objects and other non-number types).
- "unsortedNumbers" property must be of Array type.
- The sorting order is fixed and is ascending
- Array can be empty as well.
- Numbers can be positive, negative and zero, numbers can be duplicated.
- The algorithms does not limit the lenght of the data to be passed. Must be taken into account if large array are passed through - it will impact the availablity of API to serve other requests.
- The algorithms does not limit min / max values

## API design approach
- All incoming requests are routed to a proper controller through Auth middleware, which will check the presence of whitelisted auth header
- Controller is performing intial validation of required input data and calls a sorting service specifying the requested algorithm
- Service is calling Sorter lib
- All the components (controllers, services, libs) have their own validation of input data
- Decoupling controllers from libs via services we enforce a common interface, and make a replacement/upgrade of the lib very smooth, if necessary and not affecting other code

## Development
``npm run dev``

It will start server with Swagger-UI support and server live-reload on files change

## Test
```npm test```

## Production

``npm run prod``

It will run webpack with production config and create `build/api.prod.js`

Make sure webpack is available.

## License
MIT