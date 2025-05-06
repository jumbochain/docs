# ` getBlockByHash`

Returns information about a block by hash.

## Parameters

#### `DATA`, 32 Bytes

Hash of a block.

#### `Boolean`

If true it returns the full transaction objects, if false only the hashes of the transactions.

```
params: [
   '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331',
   true
]
```

## Returns

#### `Object`

A block object, or null when no block was found:

> #### `number`: `QUANTITY`
>
> the block number. null when its pending block.
>
> #### `hash`: `DATA`, 32 Bytes
>
> hash of the block. null when its pending block.
>
> #### `parentHash`: `DATA`, 32 Bytes
>
> hash of the parent block.
>
> #### `nonce`: `DATA`, 8 Bytes
>
> hash of the generated proof-of-work. null when its pending block.
>
> #### `sha3Uncles`: `DATA`, 32 Bytes
>
> SHA3 of the uncles data in the block.
>
> #### `logsBloom`: `DATA`, 256 Bytes
>
> the bloom filter for the logs of the block. null when its pending block.
>
> #### `transactionsRoot`: `DATA`, 32 Bytes
>
> the root of the transaction trie of the block.
>
> #### `stateRoot`: `DATA`, 32 Bytes
>
> the root of the final state trie of the block.
>
> #### `receiptsRoot`: `DATA`, 32 Bytes
>
> the root of the receipts trie of the block.
>
> #### `miner`: `DATA`, 20 Bytes
>
> the address of the beneficiary to whom the mining rewards were given.
>
> #### `difficulty`: `QUANTITY`
>
> integer of the difficulty for this block.
>
> #### `totalDifficulty`: `QUANTITY`
>
> integer of the total difficulty of the chain until this block.
>
> #### `extraData`: `DATA`
>
> the "extra data" field of this block.
>
> #### `size`: `QUANTITY`
>
> integer the size of this block in bytes.
> `gasLimit`: `QUANTITY`
> the maximum gas allowed in this block.
>
> #### `gasUsed`: `QUANTITY`
>
> the total used gas by all transactions in this block.
>
> #### `timestamp`: `QUANTITY`
>
> the unix timestamp for when the block was collated.
>
> #### `transactions`: `Array`
>
> Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter.
>
> #### `uncles`: `Array`
>
> Array of uncle hashes.

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
var content = new StringContent("{\n\t\"jsonrpc\":\"2.0\",\n\t\"method\":\"jumbo_getBlockByHash\",\n\t\"params\":[\n\t\t\"0xad1328d13f833b8af722117afdc406a762033321df8e48c00cd372d462f48169\", \n\t\ttrue\n\t],\n\t\"id\":1\n}", null, "application/json");
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
	"method":"jumbo_getBlockByHash",
	"params":[
		"0xad1328d13f833b8af722117afdc406a762033321df8e48c00cd372d462f48169",
		true
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
Content-Length: 159

{
	"jsonrpc":"2.0",
	"method":"jumbo_getBlockByHash",
	"params":[
		"0xad1328d13f833b8af722117afdc406a762033321df8e48c00cd372d462f48169",
		true
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
RequestBody body = RequestBody.create(mediaType, "{\n\t\"jsonrpc\":\"2.0\",\n\t\"method\":\"jumbo_getBlockByHash\",\n\t\"params\":[\n\t\t\"0xad1328d13f833b8af722117afdc406a762033321df8e48c00cd372d462f48169\", \n\t\ttrue\n\t],\n\t\"id\":1\n}");
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
  method: "jumbo_getBlockByHash",
  params: [
    "0xad1328d13f833b8af722117afdc406a762033321df8e48c00cd372d462f48169",
    true,
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
  "method": "jumbo_getBlockByHash",
  "params": [
    "0xad1328d13f833b8af722117afdc406a762033321df8e48c00cd372d462f48169",
    True
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
  method: "jumbo_getBlockByHash",
  params: [
    "0xad1328d13f833b8af722117afdc406a762033321df8e48c00cd372d462f48169",
    true,
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
	"method":"jumbo_getBlockByHash",
	"params":[
		"0xad1328d13f833b8af722117afdc406a762033321df8e48c00cd372d462f48169",
		true
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
