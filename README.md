# Erda NextJs Project Template

Erda 前端快速建站模板工程

## 特性

- 🚀 &nbsp; NextJs 自动实现 SSR
- 💼 &nbsp; Erda-UI 编码习惯
- 🥽 &nbsp;  全套 Lint 校验与自动格式化处理 ESLint + tsc + Pritter
- 🍻 &nbsp;  集成 Erda CI/CD

## 技术选型

### 框架

React v17 + NextJs v11

### 组件库

Antd 4.x

### 状态管理

cube-state

### 包管理

pnpm

### 样式

tailwindcss v2

### 图标管理

icon-park

### Utils

lodash + dayjs

## 快速开始

1. 选择 fork 或拷贝本工程
2. `pnpm i`
3. 在根目录创建一个`.env`文件

```javascript
OPENAPI_ADDR=http://xxx.services.svc.cluster.local:8080  // 你的后端服务地址
DISABLE_ERROR_OVERLAY=true // 是否需要隐藏Next特有的错误弹窗
```

4. `npm start`
5. 访问`http://localhost:3000`

## 使用方法

### 页面组件

遵照[NextJs](https://nextjs.org/docs/basic-features/pages)的规则，页面路由需要按照文件夹的结构编写

### 路由

需要获取路由参数

```javascript
import { useRouter } from 'next/router';

const Comp = (props: WithRouterProps) => {
  const router = useRouter(); // 包含所有路由信息
  React.useEffect(() => {
    if (router.isReady) { // isReady 表示在客户端渲染完成，此时才能拿到正确的query
      ...
    }
  }, [router]);
  ...
}

// 或者
import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';

const Comp = ({ router }: WithRouterProps) => {
  React.useEffect(() => {
    // 不需要判断isReady，可以直接拿到参数
  }, [router]);
  ...
}

export default withRouter(Comp);
```
