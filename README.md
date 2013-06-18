# MASH Time Zone Converter

"MASH Time Zone Converter" はスマートフォン向けに最適化されたタイムゾーン変換Webアプリです。

## Overview


## Setup

1.下記ファイル・ディレクトリを任意のディレクトリ(例:timezone)にダウンロードします。
    * /index.html
    * /timezone.js
    * /timezone.css
    * /Messages.properties
    * /Messages_en.properties
    * /Messages_ja.properties
    * /i18n/country.json
    * /i18n/country.ja.json
    * /i18n/city.json
    * /i18n/city.ja.json

1.下記のファイルを任意のディレクトリ以下の、指定のディレクトリにダウンロード（tzdata2013c.tar.gz は展開も）します。

 モジュール             | URL                                               | ファイル                            | ディレクトリ
------------------------|---------------------------------------------------|-------------------------------------|------------
 jQuery                 | http://jquery.com                                 | jquery-1.8.3.min.js                 | /jquery
 jquery-cookie          | https://github.com/carhartl/jquery-cookie         | jquery-cookie.js                    | /jquery
 jquery.i18n.properties | https://code.google.com/p/jquery-i18n-properties/ | jquery.i18n.properties-min-1.0.9.js | /jquery
 jQueryMobile           | http://jquerymobile.com                           | jquery.mobile-1.2.1.min.js          | /jqm
                        |                                                   | jquery.mobile-1.2.1.min.css         | /jqm
                        |                                                   | ajax-loader.gif                     | /jqm/images
                        |                                                   | icons-18-black.png                  | /jqm/images
                        |                                                   | icons-18-white.png                  | /jqm/images
                        |                                                   | icons-36-black.png                  | /jqm/images
                        |                                                   | icons-36-white.png                  | /jqm/images
 jQM-DateBox            | http://dev.jtsage.com/jQM-DateBox2/               | jqm-datebox.core.min.js             | /jqm-datebox
                        |                                                   | jqm-datebox.mode.datebox.min.js     | /jqm-datebox
                        |                                                   | jqm-datebox.min.css                 | /jqm-datebox
                        |                                                   | datebox.png                         | /jqm-datebox/image
 timezone-js            | https://github.com/mde/timezone-js                | date.js                             | /timezone-js
 tz database            | http://www.iana.org/time-zones                    | tzdata2013c.tar.gz                  | /tz


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
