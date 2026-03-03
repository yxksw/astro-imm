---
title: 'Markdown 样式指南'
description: '这是一份 Markdown 基础语法示例，展示了在 Astro 中编写 Markdown 内容时可以使用的基本语法。'
pubDate: '2024-06-19'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

这是一份 Markdown 基础语法示例，展示了在 Astro 中编写 Markdown 内容时可以使用的基本语法。

## 标题

以下 HTML `<h1>`—`<h6>` 元素代表六个级别的章节标题。`<h1>` 是最高级别的标题，`<h6>` 是最低级别的标题。

# 一级标题 H1

## 二级标题 H2

### 三级标题 H3

#### 四级标题 H4

##### 五级标题 H5

###### 六级标题 H6

## 段落

这是一段示例文本，展示了 Markdown 中段落的渲染效果。段落是 Markdown 中最基本的文本块，可以包含多行内容。

这是另一个段落。Markdown 使用空行来分隔不同的段落。你可以在一个段落中写很多文字，只要中间没有空行，它们就会被渲染为同一个段落。

## 图片

### 语法

```markdown
![替代文本](./完整或相对路径/图片文件)
```

### 输出

![博客占位图](../../assets/blog-placeholder-about.jpg)

## 引用块

引用块元素表示引自其他来源的内容，可以选择性地包含引用来源（必须放在 `footer` 或 `cite` 元素内），以及行内修改如注释和缩写。

### 无来源的引用块

#### 语法

```markdown
> 这是一段引用文本，展示了引用块的样式。
> **注意** 你可以在引用块中使用 _Markdown 语法_。
```

#### 输出

> 这是一段引用文本，展示了引用块的样式。
> **注意** 你可以在引用块中使用 _Markdown 语法_。

### 有来源的引用块

#### 语法

```markdown
> 不要通过共享内存来通信，而要通过通信来共享内存。<br>
> — <cite>Rob Pike[^1]</cite>
```

#### 输出

> 不要通过共享内存来通信，而要通过通信来共享内存。<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: 以上引用摘录自 Rob Pike 在 2015 年 11 月 18 日 Gopherfest 上的[演讲](https://www.youtube.com/watch?v=PAAkCSZUG1c)。

## 表格

### 语法

```markdown
| 斜体      | 粗体     | 代码     |
| --------- | -------- | -------- |
| _italics_ | **bold** | `code`   |
```

### 输出

| 斜体      | 粗体     | 代码     |
| --------- | -------- | -------- |
| _斜体_    | **粗体** | `代码`   |

## 代码块

### 语法

我们可以使用 3 个反引号 ``` 开始新的一行并编写代码片段，然后用 3 个反引号在新的一行结束。要突出显示特定语言的语法，在第一个 3 个反引号后写一种语言名称，例如 html、javascript、css、markdown、typescript、txt、bash

````markdown
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>HTML5 示例文档</title>
  </head>
  <body>
    <p>测试</p>
  </body>
</html>
```
````

### 输出

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>HTML5 示例文档</title>
  </head>
  <body>
    <p>测试</p>
  </body>
</html>
```

## 列表类型

### 有序列表

#### 语法

```markdown
1. 第一项
2. 第二项
3. 第三项
```

#### 输出

1. 第一项
2. 第二项
3. 第三项

### 无序列表

#### 语法

```markdown
- 列表项
- 另一个列表项
- 还有一个列表项
```

#### 输出

- 列表项
- 另一个列表项
- 还有一个列表项

### 嵌套列表

#### 语法

```markdown
- 水果
  - 苹果
  - 橙子
  - 香蕉
- 乳制品
  - 牛奶
  - 奶酪
```

#### 输出

- 水果
  - 苹果
  - 橙子
  - 香蕉
- 乳制品
  - 牛奶
  - 奶酪

## 其他元素 — 缩写、下标、上标、键盘按键、高亮

### 语法

```markdown
<abbr title="图形交换格式">GIF</abbr> 是一种位图图像格式。

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

按 <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> 结束会话。

大多数 <mark>蝾螈</mark> 是夜行动物，捕食昆虫、蠕虫和其他小型生物。
```

### 输出

<abbr title="图形交换格式">GIF</abbr> 是一种位图图像格式。

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

按 <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> 结束会话。

大多数 <mark>蝾螈</mark> 是夜行动物，捕食昆虫、蠕虫和其他小型生物。
