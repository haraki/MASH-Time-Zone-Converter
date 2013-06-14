# MASH Time Zone Converter

"MASH Time Zone Converter" はスマートフォン向けに最適化されたタイムゾーン変換Webアプリです。

## Overview


## Setup

下記のモジュールが必要になります。

### jquery
site: http://jquery.com/download/
file: jquery-1.8.3.min.js

### jquery-cookie.js
site: https://github.com/carhartl/jquery-cookie
file: jquery-cookie.js

### jquery.i18n.properties
site: https://code.google.com/p/jquery-i18n-properties/downloads/list
file: jquery.i18n.properties-min-1.0.9.js

### jquery.mobile
site: http://jquerymobile.com/download/
file: jquery.mobile-1.2.1.min.js

### jqm-datebox
site: http://dev.jtsage.com/cdn/datebox/latest/
file: jqm-datebox.core.min.js, jqm-datebox.mode.datebox.min.js

### timezone-js
site: https://github.com/mde/timezone-js
file: date.js

* tz database
site: http://www.iana.org/time-zones
file: tzdata2013c.tar.gz, tzcode2013c.tar.gz

## Language

日本語と英語に対応しています。
他の言語に対応したい場合は、i18nディレクトリに下記ファイルを追加する必要があります。

* jquery.mobile.datebox.i18n.{language}.utf8.js
* country.{language}.json
* timezone.{language}.json
* Message_{language}.json

## License

The MIT License (MIT)

Copyright (c) 2013 Masashi Haraki (masa.haraki@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
