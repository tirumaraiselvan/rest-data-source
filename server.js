const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const HASURA_GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || 'https://hasuracon-remote-joins.herokuapp.com/v1/graphql';

const ADD_EVENT = `
  mutation ($event_log: jsonb!){
    insert_events_one(object:{user_id: 1, log: $event_log}){
      id
    }
  }
`;

const execute = async (query, variables, reqHeaders) => {
    const fetchResponse = await fetch(
	      HASURA_GRAPHQL_ENDPOINT,
        {
            method: 'POST',
            headers: reqHeaders || {},
            body: JSON.stringify({
                query: query,
                variables
            })
        }
    );
    return await fetchResponse.json();
};


// Request Handler
app.post('/createEventLog', async (req, res) => {
    const { event_log } = req.body.input;
    const { data, errors } = await execute(ADD_EVENT,
                                           { event_log },
                                           {}
                                          );

    console.log(data);
    console.log(errors);
    var resp = data["insert_events_one"];
    return res.json({
      event_id: resp.id
    });

});

app.post('/getUserEnriched', async (req, res) => {

    return res.json({
        id: 1,
        verified: true,
        address: "21 baker street"
    });

});


app.listen(PORT);


