# ` getTransactionByBlockHashAndIndex`

Returns information about a transaction by block hash and transaction index position.

## Parameters

#### `DATA`, 32 Bytes

hash of a block.

#### `QUANTITY`

integer of the transaction index position.

```
params: [
   '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331',
   '0x0' // 0
]
```

## Returns

#### `Object`

A transaction object, or null when no transaction was found:

> #### `hash`: `DATA`, 32 Bytes
>
> hash of the transaction.
>
> #### `nonce`: `QUANTITY`
>
> the number of transactions made by the sender prior to this one.
>
> #### `blockHash`: `DATA`, 32 Bytes
>
> hash of the block where this transaction was in. null when its pending.
>
> #### `blockNumber`: `QUANTITY`
>
> block number where this transaction was in. null when its pending.
>
> #### `transactionIndex`: `QUANTITY`
>
> integer of the transactions index position in the block. null when its pending.
>
> #### `from`: `DATA`, 20 Bytes
>
> address of the sender.
>
> #### `to`: `DATA`, 20 Bytes
>
> address of the receiver. null when its a contract creation transaction.
>
> #### `value`: `QUANTITY`
>
> value transferred in Nexi.
>
> #### `gasPrice`: `QUANTITY`
>
> gas price provided by the sender in Nexi.
> `gas`: `QUANTITY`
> gas provided by the sender.
>
> #### `input`: `DATA`
>
> the data send along with the transaction.

## Requests

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="c#"
groupId="codeGroup1"
values={[
{label:"C#",value:"c#"},
{label:"cURL",value:"curl"},
{label:"HTTP",value:"http"},
{label:"Java",value:"java"},
{label:"NodeJs",value:"node"},
{label:"Python",value:"python"},
{label:"Javascript",value:"js"},
{label:"Go",value:"go"},
]
}>
<TabItem value="c#">

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Post, "https://testnode.jumbochain.org");
var content = new StringContent("{\n\t\"jsonrpc\":\"2.0\",\n\t\"method\":\"jumbo_getTransactionByBlockHashAndIndex\",\n\t\"params\":[\n\t\t\"0x3c82bc62179602b67318c013c10f99011037c49cba84e31ffe6e465a21c521a7\", \n\t\t\"0x0\"\n\t],\n\t\"id\":1\n}", null, "application/json");
request.Content = content;
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());

```

</TabItem>

<TabItem value="curl">

```bash
curl --location 'https://testnode.jumbochain.org' \
--header 'Content-Type: application/json' \
--data '{
	"jsonrpc":"2.0",
	"method":"jumbo_getTransactionByBlockHashAndIndex",
	"params":[
		"0x3c82bc62179602b67318c013c10f99011037c49cba84e31ffe6e465a21c521a7",
		"0x0"
	],
	"id":1
}'
```

</TabItem>

<TabItem value="http">

```http
POST / HTTP/1.1
Host: testnode.jumbochain.org
Content-Type: application/json
Content-Length: 179

{
	"jsonrpc":"2.0",
	"method":"jumbo_getTransactionByBlockHashAndIndex",
	"params":[
		"0x3c82bc62179602b67318c013c10f99011037c49cba84e31ffe6e465a21c521a7",
		"0x0"
	],
	"id":1
}
```

</TabItem>

<TabItem value="java">

```java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\n\t\"jsonrpc\":\"2.0\",\n\t\"method\":\"jumbo_getTransactionByBlockHashAndIndex\",\n\t\"params\":[\n\t\t\"0x3c82bc62179602b67318c013c10f99011037c49cba84e31ffe6e465a21c521a7\", \n\t\t\"0x0\"\n\t],\n\t\"id\":1\n}");
Request request = new Request.Builder()
  .url("https://testnode.jumbochain.org")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();
```

</TabItem>

<TabItem value="node">

```js
const axios = require("axios");
let data = JSON.stringify({
  jsonrpc: "2.0",
  method: "jumbo_getTransactionByBlockHashAndIndex",
  params: [
    "0x3c82bc62179602b67318c013c10f99011037c49cba84e31ffe6e465a21c521a7",
    "0x0",
  ],
  id: 1,
});

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://testnode.jumbochain.org",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
```

</TabItem>

<TabItem value="python">

```python
import requests
import json

url = "https://testnode.jumbochain.org"

payload = json.dumps({
  "jsonrpc": "2.0",
  "method": "jumbo_getTransactionByBlockHashAndIndex",
  "params": [
    "0x3c82bc62179602b67318c013c10f99011037c49cba84e31ffe6e465a21c521a7",
    "0x0"
  ],
  "id": 1
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)


```

</TabItem>

<TabItem value="js">

```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  jsonrpc: "2.0",
  method: "jumbo_getTransactionByBlockHashAndIndex",
  params: [
    "0x3c82bc62179602b67318c013c10f99011037c49cba84e31ffe6e465a21c521a7",
    "0x0",
  ],
  id: 1,
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("https://testnode.jumbochain.org", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

</TabItem>

<TabItem value="go">

```go
package main

import (
  "fmt"
  "strings"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://testnode.jumbochain.org"
  method := "POST"

  payload := strings.NewReader(`{
	"jsonrpc":"2.0",
	"method":"jumbo_getTransactionByBlockHashAndIndex",
	"params":[
		"0x3c82bc62179602b67318c013c10f99011037c49cba84e31ffe6e465a21c521a7",
		"0x0"
	],
	"id":1
}`)

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("Content-Type", "application/json")

  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}
```

</TabItem>

</Tabs>
