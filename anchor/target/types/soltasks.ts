/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/soltasks.json`.
 */
export type Soltasks = {
  "address": "9MyAxBXoj6kMv1jtfzjGGoL9RCvtNLgGbjDLPnpjXxFx",
  "metadata": {
    "name": "soltasks",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createTodo",
      "discriminator": [
        250,
        161,
        142,
        148,
        131,
        48,
        194,
        181
      ],
      "accounts": [
        {
          "name": "todo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "task"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "task",
          "type": "string"
        },
        {
          "name": "desc",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteTodo",
      "discriminator": [
        224,
        212,
        234,
        177,
        90,
        57,
        219,
        115
      ],
      "accounts": [
        {
          "name": "todo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "task"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "task",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateTodo",
      "discriminator": [
        105,
        8,
        31,
        183,
        159,
        73,
        203,
        134
      ],
      "accounts": [
        {
          "name": "todo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "task"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "task",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "todoState",
      "discriminator": [
        232,
        39,
        87,
        92,
        45,
        186,
        14,
        13
      ]
    }
  ],
  "types": [
    {
      "name": "todoState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "task",
            "type": "string"
          },
          {
            "name": "desc",
            "type": "string"
          },
          {
            "name": "done",
            "type": "bool"
          },
          {
            "name": "taskId",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
