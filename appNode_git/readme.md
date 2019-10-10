A very simple toy API for a shopping list

## Usage

Start with `node server`.

## Entry points

- `/shopping-list` (`GET`): returns all the shopping lists
- `/shopping-list` (`POST`): creates a new list from the request body and a random id
- `/shopping-list/<id>` (`GET`): returns a specific shopping list
- `/shopping-list/<id>` (`PUT`): modifies a shopping list
- `/shopping-list/<id>` (`DELETE`): removes a shopping list
