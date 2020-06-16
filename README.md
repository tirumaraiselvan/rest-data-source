## Actions

#### Postgres

```
create table events (id serial primary key, user_id integer, log jsonb);A
```

#### Schema

```
type Mutation {
  createEventLog (
    event_log: EventInput
  ): EventOutput
}

input EventInput {
  log : jsonb
}

type EventOutput {
  id : Int
}

```

