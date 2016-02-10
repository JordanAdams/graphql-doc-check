GraphQL Documentation Check
========

<!-- [![Build Status](https://travis-ci.org/JordanAdams/graphql-doc-check.svg?branch=master)](https://travis-ci.org/JordanAdams/graphql-doc-check)
[![Dependency Status](https://david-dm.org/jordanadams/graphql-doc-check.svg)](https://david-dm.org/jordanadams/graphql-doc-check) -->

Check for missing descriptions and field names in your GraphQL API.

## Installation

    npm install -g graphql-doc-check

## Usage

Calling `graphql-doc-check` without any arguments will assume that your GraphQL
API is running at `http://localhost:80/graphql`.

    $ graphql-doc-check

Alternatively, you can pass a url to check.

    $ graphql-doc-check https://example.com:8888/graph

Any missing pieces of the passed url will be populated to match the assumed url.

    $ graphql-doc-check example.com/graph

    Is equal to

    $ graphql-doc-check http://example.com:80/graph

## License

Copyright (c) 2016, Jordan Adams

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
