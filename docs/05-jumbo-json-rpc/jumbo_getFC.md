# ` getFilterChanges`

Polling method for a filter, which returns an array of logs which occurred since last poll.

## Parameters

#### `QUANTITY`

the filter id

```
params: [
  "0x16" // 22
]
```

## Returns

#### `Array`

Array of log objects, or an empty array if nothing has changed since last poll.

For filters created with `jumbo_newBlockFilter` the return are block hashes (DATA, 32 Bytes), e.g. `["0x3454645634534..."]`.

For filters created with `jumbo_newPendingTransactionFilter` the return are transaction hashes (DATA, 32 Bytes), e.g. `["0x6345343454645..."]`.

For filters created with `jumbo_newFilter` logs are objects with following params:

> `removed`: `TAG` - true when the log was removed, due to a chain reorganization. false if its a valid log.
>
> `logIndex`: `QUANTITY` - integer of the log index position in the block. null when its pending log.
>
> `transactionIndex`: `QUANTITY` - integer of the transactions index position log was created from. null when its pending log.
>
> `transactionHash`: `DATA`, 32 Bytes - hash of the transactions this log was created from. null when its pending log.
>
> `blockHash`: `DATA`, 32 Bytes - hash of the block where this log was in. null when its pending. null when its pending log.
>
> `blockNumber`: `QUANTITY` - the block number where this log was in. null when its pending. null when its pending log.
>
> `address`: `DATA`, 20 Bytes - address from which this log originated.
>
> `data`: `DATA` - contains one or more 32 Bytes non-indexed arguments of the log.
>
> `topics`: `Array of DATA `- Array of 0 to 4 32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. `Deposit(address,bytes32,uint256)`), except you declared the event with the anonymous specifier.)

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
var content = new StringContent("{\n\t\"jsonrpc\":\"2.0\",\n\t\"method\":\"jumbo_getFilterChanges\",\n\t\"params\":[\n\t\t\"0x16\"\n\t],\n\t\"id\":73\n}", null, "application/json");
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
	"method":"jumbo_getFilterChanges",
	"params":[
		"0x16"
	],
	"id":73
}'
```

</TabItem>
<TabItem value="http">

```http
POST / HTTP/1.1
Host: testnode.jumbochain.org
Content-Type: application/json
Content-Length: 91

{
	"jsonrpc":"2.0",
	"method":"jumbo_getFilterChanges",
	"params":[
		"0x16"
	],
	"id":73
}
```

</TabItem>

<TabItem value="java">

```java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\n\t\"jsonrpc\":\"2.0\",\n\t\"method\":\"jumbo_getFilterChanges\",\n\t\"params\":[\n\t\t\"0x16\"\n\t],\n\t\"id\":73\n}");
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
  method: "jumbo_getFilterChanges",
  params: ["0x16"],
  id: 73,
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
  "method": "jumbo_getFilterChanges",
  "params": [
    "0x16"
  ],
  "id": 73
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
  method: "jumbo_getFilterChanges",
  params: ["0x16"],
  id: 73,
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
	"method":"jumbo_getFilterChanges",
	"params":[
		"0x16"
	],
	"id":73
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
