export class ApiCodeGenerator {
  generateJavaScriptExample(
    method: string,
    url: string,
    data?: any,
    headers: Record<string, string> = {}
  ): string {
    const headersString = Object.entries(headers)
      .map(([key, value]) => `      '${key}': '${value}'`)
      .join(',\n')

    const dataString = data ? JSON.stringify(data, null, 6) : ''

    return `// JavaScript/Node.js 示例
const fetch = require('node-fetch');

async function apiCall() {
  const url = '${url}';
  const options = {
    method: '${method.toUpperCase()}',
    headers: {
${headersString}
    }${dataString ? `,
    body: JSON.stringify(${dataString})` : ''}
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    console.log('API Response:', result);
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// 调用示例
apiCall().catch(console.error);`
  }

  generateTypeScriptExample(
    method: string,
    url: string,
    data?: any,
    headers: Record<string, string> = {}
  ): string {
    const headersString = Object.entries(headers)
      .map(([key, value]) => `      '${key}': '${value}'`)
      .join(',\n')

    const dataString = data ? JSON.stringify(data, null, 6) : ''

    // 定义类型
    const responseType = data ? 'any' : 'any'
    const requestType = data ? typeof data === 'object' ? 'Record<string, any>' : 'any' : 'void'

    return `// TypeScript 示例
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: any;
  timestamp: string;
}

async function apiCall<T = ${responseType}>(): Promise<ApiResponse<T>> {
  const url = '${url}';
  const options: RequestInit = {
    method: '${method.toUpperCase()}',
    headers: {
      'Content-Type': 'application/json',
${headersString}
    }${dataString ? `,
    body: JSON.stringify(${dataString})` : ''}
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(\`API Error: \${error.error}\`);
    }

    const result: ApiResponse<T> = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// 调用示例
async function main() {
  try {
    const result = await apiCall();
    console.log('API Response:', result);
  } catch (error) {
    console.error('Failed to call API:', error);
  }
}

main().catch(console.error);`
  }

  generatePythonExample(
    method: string,
    url: string,
    data?: any,
    headers: Record<string, string> = {}
  ): string {
    const headersString = Object.entries(headers)
      .map(([key, value]) => `        '${key}': '${value}'`)
      .join(',\n')

    const dataString = data ? JSON.stringify(data, null, 8) : ''

    return `# Python 示例
import requests
import json
from typing import Optional, Dict, Any, Union

class APIClient:
    def __init__(self, base_url: str = "${url.split('/api')[0]}/api"):
        self.base_url = base_url
        self.session = requests.Session()

    def _make_request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, str]] = None
    ) -> Dict[str, Any]:
        url = f"{self.base_url}{endpoint}"

        default_headers = {
            'Content-Type': 'application/json',
${headersString}
        }

        if headers:
            default_headers.update(headers)

        try:
            response = self.session.request(
                method=method,
                url=url,
                json=data,
                headers=default_headers,
                timeout=30
            )

            response.raise_for_status()
            return response.json()

        except requests.exceptions.RequestException as e:
            print(f"API Error: {e}")
            raise

# 使用示例
def main():
    client = APIClient()

    try:
        result = client._make_request(
            method='${method.toUpperCase()}',
            endpoint='${url.replace('/api', '')}',
            data=${data ? dataString : 'None'}
        )

        print("API Response:", json.dumps(result, indent=2, ensure_ascii=False))

    except Exception as e:
        print(f"Failed to call API: {e}")

if __name__ == '__main__':
    main()`
  }

  generateCurlExample(
    method: string,
    url: string,
    data?: any,
    headers: Record<string, string> = {}
  ): string {
    const headersString = Object.entries(headers)
      .map(([key, value]) => `      -H "${key}: ${value}"`)
      .join(' \\\n')

    const dataString = data ? ` \\\n      -d '${JSON.stringify(data)}'` : ''

    return `# cURL 示例
curl -X ${method.toUpperCase()} '${url}' \\
${headersString}${dataString}`
  }

  generateReactHookExample(
    method: string,
    url: string,
    data?: any,
    headers: Record<string, string> = {}
  ): string {
    const headersString = Object.entries(headers)
      .map(([key, value]) => `      '${key}': '${value}'`)
      .join(',\n')

    const dataString = data ? JSON.stringify(data, null, 6) : ''

    return `// React Hook 示例
import { useState, useCallback } from 'react';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

interface ApiError {
  success: false;
  error: string;
  code?: string;
  details?: any;
  timestamp: string;
}

function useApi${method.charAt(0).toUpperCase() + method.slice(1)}<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (requestData?: ${data ? 'Record<string, any>' : 'void'}): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('${url}', {
        method: '${method.toUpperCase()}',
        headers: {
          'Content-Type': 'application/json',
${headersString}
        },${dataString ? `
        body: JSON.stringify(${dataString})` : ''}
      });

      if (!response.ok) {
        const errorResult: ApiError = await response.json();
        throw new Error(errorResult.error || \`HTTP error! status: \${response.status}\`);
      }

      const result: ApiResponse<T> = await response.json();
      setData(result.data || null);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
}

// 使用示例
function OrderListComponent() {
  const { data, loading, error, execute } = useApi${method.charAt(0).toUpperCase() + method.slice(1)}();

  const handleRefresh = () => {
    execute().catch(console.error);
  };

  if (loading) return <div className="loading">加载中...</div>;
  if (error) return <div className="error">错误: {error}</div>;

  return (
    <div className="order-list">
      <button onClick={handleRefresh} disabled={loading}>
        {loading ? '刷新中...' : '刷新订单'}
      </button>

      {data && (
        <div className="data">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}`
  }

  generateAxiosExample(
    method: string,
    url: string,
    data?: any,
    headers: Record<string, string> = {}
  ): string {
    const headersString = Object.entries(headers)
      .map(([key, value]) => `      '${key}': '${value}'`)
      .join(',\n')

    return `// Axios 示例
import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: '${url.split('/api')[0]}',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
${headersString}
  }
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log(\`Request: \${config.method?.toUpperCase()} \${config.url}\`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log(\`Response: \${response.status} \${response.config.url}\`);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API调用函数
export const ${method}Api = async (endpoint: string${data ? ', data?: any' : ''}) => {
  try {
    const response = await api.${method.toLowerCase()}(
      '${url.replace('/api', '')}',
      ${data ? 'data' : ''}
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(\`API Error \${error.response?.status}:\`, error.response?.data);
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
};

// 使用示例
async function example() {
  try {
    const result = await ${method}Api('${url.replace('/api', '')}'${data ? ', ' + JSON.stringify(data) : ''});
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error);
  }
}

example().catch(console.error);`
  }

  generateJavaExample(
    method: string,
    url: string,
    data?: any,
    headers: Record<string, string> = {}
  ): string {
    const headersString = Object.entries(headers)
      .map(([key, value]) => `            .header("${key}", "${value}")`)
      .join('\n')

    return `// Java (OkHttp) 示例
import okhttp3.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class ApiClient {
    private final OkHttpClient client;
    private final ObjectMapper mapper;
    private final String baseUrl;

    public ApiClient(String baseUrl) {
        this.baseUrl = baseUrl;
        this.client = new OkHttpClient.Builder()
            .connectTimeout(10, TimeUnit.SECONDS)
            .writeTimeout(10, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .build();
        this.mapper = new ObjectMapper();
    }

    public String makeRequest(String endpoint, String method, Map<String, Object> data) throws IOException {
        String url = this.baseUrl + endpoint;

        Request.Builder requestBuilder = new Request.Builder()
            .url(url)${headersString ? '\n' + headersString : ''}
            .header("Content-Type", "application/json");

        if (data != null && ("POST".equals(method) || "PUT".equals(method))) {
            String jsonBody = mapper.writeValueAsString(data);
            RequestBody body = RequestBody.create(
                jsonBody,
                MediaType.get("application/json; charset=utf-8")
            );
            requestBuilder.method(method, body);
        } else {
            requestBuilder.method(method, null);
        }

        Request request = requestBuilder.build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }

            return response.body().string();
        }
    }

    public static void main(String[] args) {
        try {
            ApiClient client = new ApiClient("${url.split('/api')[0]}");

${data ? `            Map<String, Object> data = Map.of(
                ${Object.entries(data).map(([key, value]) =>
                  `"${key}", ${typeof value === 'string' ? `"${value}"` : value}`
                ).join(',\n                ')}
            );
` : '            '}
            String response = client.makeRequest(
                "${url.replace('/api', '')}",
                "${method.toUpperCase()}"${data ? ', data' : ''}
            );

            System.out.println("API Response: " + response);

        } catch (IOException e) {
            System.err.println("API Error: " + e.getMessage());
        }
    }
}`
  }

  generateGoExample(
    method: string,
    url: string,
    data?: any,
    headers: Record<string, string> = {}
  ): string {
    const headersString = Object.entries(headers)
      .map(([key, value]) => `    "${key}": []string{"${value}"},`)
      .join('\n')

    return `// Go 示例
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "time"
)

type ApiResponse struct {
    Success bool        \`json:"success"\`
    Data    interface{} \`json:"data,omitempty"\`
    Error   string      \`json:"error,omitempty"\`
    Message string      \`json:"message,omitempty"\`
}

func main() {
    // 创建HTTP客户端
    client := &http.Client{
        Timeout: 30 * time.Second,
    }

    // 准备请求URL
    url := "${url}"

${data ? `    // 准备请求数据
    requestData := map[string]interface{}{
${Object.entries(data).map(([key, value]) =>
        `        "${key}": ${typeof value === 'string' ? `"${value}"` : value},`
      ).join('\n')}
    }

    jsonData, err := json.Marshal(requestData)
    if err != nil {
        fmt.Printf("Error marshaling JSON: %v\\n", err)
        return
    }
` : '    '}
    // 创建请求
    var req *http.Request
    var err error

${data ? `    req, err = http.NewRequest("${method.toUpperCase()}", url, bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Printf("Error creating request: %v\\n", err)
        return
    }

    // 设置请求头
    req.Header.Set("Content-Type", "application/json")` : `    req, err = http.NewRequest("${method.toUpperCase()}", url, nil)
    if err != nil {
        fmt.Printf("Error creating request: %v\\n", err)
        return
    }`}

${headersString ? `    // 设置认证头
${headersString}` : ''}

    // 发送请求
    resp, err := client.Do(req)
    if err != nil {
        fmt.Printf("Error sending request: %v\\n", err)
        return
    }
    defer resp.Body.Close()

    // 读取响应
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        fmt.Printf("Error reading response: %v\\n", err)
        return
    }

    // 解析响应
    var apiResp ApiResponse
    if err := json.Unmarshal(body, &apiResp); err != nil {
        fmt.Printf("Error parsing response: %v\\n", err)
        return
    }

    // 处理响应
    if apiResp.Success {
        fmt.Printf("API调用成功: %s\\n", apiResp.Message)
        if apiResp.Data != nil {
            dataBytes, _ := json.MarshalIndent(apiResp.Data, "", "  ")
            fmt.Printf("响应数据:\\n%s\\n", string(dataBytes))
        }
    } else {
        fmt.Printf("API调用失败: %s\\n", apiResp.Error)
    }
}`
  }

  generateSwiftExample(
    method: string,
    url: string,
    data?: any,
    headers: Record<string, string> = {}
  ): string {
    const headersString = Object.entries(headers)
      .map(([key, value]) => `        request.setValue("${value}", forHTTPHeaderField: "${key}")`)
      .join('\n')

    return `// Swift 示例
import Foundation

struct ApiResponse<T: Codable>: Codable {
    let success: Bool
    let data: T?
    let error: String?
    let message: String?
    let timestamp: String
}

class APIClient {
    private let baseURL: URL
    private let session: URLSession

    init(baseURL: String) {
        self.baseURL = URL(string: baseURL)!
        self.session = URLSession(configuration: .default)
    }

    func makeRequest<T: Codable>(
        endpoint: String,
        method: String,
        data: [String: Any]? = nil
    ) async throws -> ApiResponse<T> {

        let url = baseURL.appendingPathComponent(endpoint)
        var request = URLRequest(url: url)
        request.httpMethod = method

        // 设置请求头
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
${headersString ? '\n' + headersString + '\n' : ''}

        // 设置请求体
        if let data = data, !["GET", "DELETE"].contains(method.uppercased()) {
            request.httpBody = try JSONSerialization.data(withJSONObject: data)
        }

        // 发送请求
        let (data, response) = try await session.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError.invalidResponse
        }

        guard (200...299).contains(httpResponse.statusCode) else {
            throw APIError.serverError(statusCode: httpResponse.statusCode)
        }

        // 解析响应
        let apiResponse = try JSONDecoder().decode(ApiResponse<T>.self, from: data)

        if !apiResponse.success {
            throw APIError.apiError(message: apiResponse.error ?? "Unknown error")
        }

        return apiResponse
    }
}

enum APIError: Error, LocalizedError {
    case invalidResponse
    case serverError(statusCode: Int)
    case apiError(message: String)

    var errorDescription: String? {
        switch self {
        case .invalidResponse:
            return "Invalid response from server"
        case .serverError(let statusCode):
            return "Server error with status code: \\(statusCode)"
        case .apiError(let message):
            return message
        }
    }
}

// 使用示例
class OrderService {
    private let client: APIClient

    init() {
        self.client = APIClient(baseURL: "${url.split('/api')[0]}")
    }

    func ${method.lowercased()}Orders${data ? '(data: [String: Any])' : ''}() async throws -> ApiResponse<[Order]> {
        return try await client.makeRequest(
            endpoint: "${url.replace('/api', '')}",
            method: "${method.toUpperCase()}"${data ? ',\n            data: data' : ''}
        )
    }
}

// 数据模型
struct Order: Codable {
    let id: String
    let orderNumber: String
    let status: String
    let cargoName: String
    let createdAt: String
}

// 调用示例
@MainActor
class OrderViewModel: ObservableObject {
    @Published var orders: [Order] = []
    @Published var isLoading = false
    @Published var errorMessage: String?

    private let service = OrderService()

    func ${method.lowercased()}Orders${data ? '(withData data: [String: Any])' : ''}() async {
        isLoading = true
        errorMessage = nil

        do {
            let response = try await service.${method.lowercased()}Orders${data ? '(data: data)' : ''}()
            if let orders = response.data {
                self.orders = orders
            }
        } catch {
            errorMessage = error.localizedDescription
        }

        isLoading = false
    }
}`
  }

  // 生成完整的代码示例集合
  generateAllExamples(
    method: string,
    url: string,
    data?: any,
    headers: Record<string, string> = {},
    description?: string
  ): string {
    let content = `# API代码示例

${description ? `## 描述\n${description}\n` : ''}
## 端点信息
- **方法**: ${method.toUpperCase()}
- **URL**: ${url}
- **认证**: ${Object.keys(headers).length > 0 ? '需要' : '不需要'}

## 代码示例

### 1. JavaScript/Node.js

\`\`\`javascript
${this.generateJavaScriptExample(method, url, data, headers)}
\`\`\`

### 2. TypeScript

\`\`\`typescript
${this.generateTypeScriptExample(method, url, data, headers)}
\`\`\`

### 3. Python

\`\`\`python
${this.generatePythonExample(method, url, data, headers)}
\`\`\`

### 4. cURL

\`\`\`bash
${this.generateCurlExample(method, url, data, headers)}
\`\`\`

### 5. React Hook

\`\`\`typescript
${this.generateReactHookExample(method, url, data, headers)}
\`\`\`

### 6. Axios

\`\`\`typescript
${this.generateAxiosExample(method, url, data, headers)}
\`\`\`

### 7. Java (OkHttp)

\`\`\`java
${this.generateJavaExample(method, url, data, headers)}
\`\`\`

### 8. Go

\`\`\`go
${this.generateGoExample(method, url, data, headers)}
\`\`\`

### 9. Swift

\`\`\`swift
${this.generateSwiftExample(method, url, data, headers)}
\`\`\`

## 响应示例

\`\`\`json
{
  "success": true,
  "data": ${data ? JSON.stringify(data, null, 2) : '{}'},
  "message": "操作成功",
  "timestamp": "2024-01-01T00:00:00Z"
}
\`\`\`

## 错误处理

所有API请求都应包含适当的错误处理：

\`\`\`javascript
// 错误处理示例
try {
  const result = await apiCall();
  console.log('Success:', result);
} catch (error) {
  if (error.response) {
    // 服务器响应了错误状态码
    console.error('Server Error:', error.response.status, error.response.data);
  } else if (error.request) {
    // 请求已发送但没有收到响应
    console.error('Network Error:', error.message);
  } else {
    // 请求设置时出错
    console.error('Request Error:', error.message);
  }
}
\`\`\`

## 最佳实践

1. **认证**: 确保在所有需要认证的请求中包含正确的认证头
2. **错误处理**: 实现完整的错误处理逻辑
3. **超时设置**: 为网络请求设置合理的超时时间
4. **重试机制**: 对临时性错误实现重试逻辑
5. **日志记录**: 记录API调用和响应以便调试
6. **数据验证**: 验证输入数据和响应数据
`

    return content
  }
}