# .VpnApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**startLetheand**](VpnApi.md#startLetheand) | **GET** /letheand/start | 


# **startLetheand**
> void startLetheand()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .VpnApi(configuration);

let body:.VpnApiStartLetheandRequest = {
  // string | Returns the binary version
  dataDir: "data_dir_example",
  // boolean | Returns the binary version (optional)
  version: true,
};

apiInstance.startLetheand(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dataDir** | [**string**] | Returns the binary version | defaults to undefined
 **version** | [**boolean**] | Returns the binary version | (optional) defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


