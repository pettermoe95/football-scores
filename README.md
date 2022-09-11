# football-scores
Football score simulator using react.js and nest.js, with server side events.

## Run locally
First install the nestjs cli
```
npm i -g @nestjs/cli
````
Navigate to both server and client folder, then install dependencies:
```
npm i
```
Run both server and client applications. Do it by running this command in both server and client folder:
```
npm run dev
```

You should have the server running at port :3000 and client at :8085

## Logic
The server stores a list of games that are ready to start. Once the user presses the start button, an api call is made to start simulating the games.

Every minute(second in real life) an event is created for each game, updating the minutes and status of the game.

When a goal is scored a goal event is created.

The client gets the events using EventSource, and updates the components state in real time.

Once the games reach 90 minutes the simulation stops.
