# @everymundo/aws-instance-identity
Returns information about the AWS Instance that calls it


## Installation
```sh
npm install @everymundo/aws-instance-identity
```

## Usage

### With promise
```js
const { getIdentityDocument } = require('@everymundo/aws-instance-identity');
getIdentityDocument()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });
```


### With async/await
```js
const { getIdentityDocument } = require('@everymundo/aws-instance-identity');

const init = async() => {
  try {
    const result = getIdentityDocument();
    console.log(result);
  } catch (e) {
    console.error(err);
  }
}
```

## Running outside AWS servers

When running locally it will fail the request since that request is done to an endpoint that
only works inside the aws infrastructure.

#### With Socks Proxy
If you really want to get a document you can do so by running a socks proxy with an AWS instance
via ssh. The connection can be stablished by running the following command:

```sh
# You should replace your-instance-address by your instance address
ssh -ND 8157 your-instance-address &> /dev/null & PID=$! && echo $PID
```

After that you can just set the environment variable ```SOCKS_PROXY=socks://127.0.0.1:8157``` and run your aplication.

You can try that out in a node console
```sh
SOCKS_PROXY=socks://127.0.0.1:8157 node -e "require('@everymundo/aws-instance-identity').getIdentityDocument().then(console.log)"
```
The output would be similar to this:
```js
{
  privateIp: '192.168.0.12',
  devpayProductCodes: null,
  availabilityZone: 'us-west-1a',
  version: '2010-08-31',
  instanceId: 'i-2093840273489',
  billingProducts: null,
  instanceType: 'm4.xlarge',
  accountId: '98237498273984',
  architecture: 'x86_64',
  kernelId: null,
  ramdiskId: null,
  imageId: 'ami-34cb443',
  pendingTime: '2017-10-20T20:41:03Z',
  region: 'us-west-1'
}
```

#### Without Socks Proxy
This should bring you an error
```sh
node -e "require('@everymundo/aws-instance-identity').getIdentityDocument().catch(console.error)"
```
The error message would be something similar to this:
```js
{ code: 599,
  start: 2018-03-21T04:35:54.692Z,
  end: 1521606957775,
  err:
   { Error: connect EHOSTUNREACH 169.254.169.254:80
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1170:14)
     errno: 'EHOSTUNREACH',
     code: 'EHOSTUNREACH',
     syscall: 'connect',
     address: '169.254.169.254',
     port: 80 },
  attempt: 1,
  endpoint: 'http://169.254.169.254/latest/dynamic/instance-identity/document' }
```