# MASH Time Zone Converter

## 概要 Overview

*"MASH Time Zone Converter"* はスマートフォン向けに作られたタイムゾーン変換のためのWebアプリです。
（もちろん、PC用のWebブラウザでも使用することができます）

タイムゾーンの変換には [timezone-js](https://github.com/mde/timezone-js) を使用しており、
このモジュールは [IANA](http://www.iana.org) が管理している [タイムゾーンデータベース](http://www.iana.org/time-zones) を使用しているため、
夏時間も考慮した正確なタイムゾーン間の時刻変換を行うことができます。

PerlやPHP等、サーバサイドで動作するプログラムはありません(「国・地域」「都市」選択用データ生成のためのPerlスクリプトは除く)。
そのため、サーバ側の負荷は軽いです。

http://haraki.jp/timezone/ で実際の動作を見ることができます。

## セットアップ Setup

1.下記ファイルを任意のディレクトリ(例:timezone)にダウンロードします。

* /index.html
* /timezone.js
* /timezone.css
* /i18n/Messages.properties
* /i18n/Messages_en.properties
* /i18n/Messages_ja.properties
* /i18n/country.json
* /i18n/country.ja.json
* /i18n/timezone.json
* /i18n/timezone.ja.json

2.下記のファイルを任意のディレクトリ以下の、指定のディレクトリにダウンロード（tzdata2013c.tar.gz は展開も）します。

 モジュール             | URL                                               | ファイル                              | ディレクトリ
------------------------|---------------------------------------------------|---------------------------------------|--------------------
 jQuery                 | http://jquery.com                                 | jquery-1.8.3.min.js                   | /jquery
 jquery-cookie          | https://github.com/carhartl/jquery-cookie         | jquery-cookie.js                      | /jquery
 jquery.i18n.properties | https://code.google.com/p/jquery-i18n-properties/ | jquery.i18n.properties-min-1.0.9.js   | /jquery
 jQueryMobile           | http://jquerymobile.com                           | jquery.mobile-1.2.1.min.js            | /jqm
                        |                                                   | jquery.mobile-1.2.1.min.css           | /jqm
                        |                                                   | ajax-loader.gif                       | /jqm/images
                        |                                                   | icons-18-black.png                    | /jqm/images
                        |                                                   | icons-18-white.png                    | /jqm/images
                        |                                                   | icons-36-black.png                    | /jqm/images
                        |                                                   | icons-36-white.png                    | /jqm/images
 jQM-DateBox            | http://dev.jtsage.com/jQM-DateBox2/               | jqm-datebox.core.min.js               | /jqm-datebox
                        |                                                   | jqm-datebox.mode.datebox.min.js       | /jqm-datebox
                        |                                                   | jqm-datebox.min.css                   | /jqm-datebox
                        |                                                   | jquery.mobile.datebox.i18n.en.utf8.js | /i18n
                        |                                                   | jquery.mobile.datebox.i18n.ja.utf8.js | /i18n
                        |                                                   | datebox.png                           | /jqm-datebox/image
 timezone-js            | https://github.com/mde/timezone-js                | date.js                               | /timezone-js
 tz database            | http://www.iana.org/time-zones                    | tzdata2013c.tar.gz                    | /tz


ここまでで、ディレクトリ構成は下記のようになっているはずです。

    <timezone>
    |
    |-- index.html
    |
    |-- timezone.js
    |
    |-- timezone.css
    |
    |-- <i18n>
    |   |
    |   |-- Messages.properties
    |   |
    |   |-- Messages_en.properties
    |   |
    |   |-- Messages_ja.properties
    |   |
    |   |-- country.json
    |   |
    |   |-- country.ja.json
    |   |
    |   |-- timezone.json
    |   |
    |   |-- timezone.ja.json
    |   |
    |   |-- jquery.mobile.datebox.i18n.en.utf8.js
    |   |
    |   |-- jquery.mobile.datebox.i18n.ja.utf8.js
    |
    |-- <jquery>
    |   |
    |   |-- jquery-1.8.3.min.js
    |   |
    |   |-- jquery.cookie.js
    |   |
    |   |-- jquery.i18n.properties-min-1.0.9.js
    |
    |-- <jqm>
    |   |
    |   |-- jquery.mobile-1.2.1.min.js
    |   |
    |   |-- jquery.mobile-1.2.1.min.css
    |   |
    |   |-- <images>
    |       |
    |       |-- ajax-loader.gif
    |       |
    |       |-- icons-18-black.png
    |       |
    |       |-- icons-18-white.png
    |       |
    |       |-- icons-36-black.png
    |       |
    |       |-- icons-36-white.png
    |
    |-- <jqm-datebox>
    |   |
    |   |-- jqm-datebox.core.min.js
    |   |
    |   |-- jqm-datebox.mode.datebox.min.js
    |   |
    |   |-- jqm-datebox.min.css
    |   |
    |   |-- <image>
    |       |
    |       |-- datebox.png
    |
    |-- <timezone-js>
    |   |
    |   |-- date.js
    |
    |-- <tz>
        |
        |-- タイムゾーンデータファイル群


## 使用方法 Usage

一番上のセレクトメニューは言語設定です。
現在は日本語と英語が選択できます。

「変換元」の「国・地域」「都市」を選択すると、現在の日付・時刻が設定されます。
日付・時刻をタップすると、入力用のダイアログが表示され、変更することができます。

「変換先」の「国・地域」「都市」を選択すると、「変換元」に設定された日付・時刻から「変換先」の「国・地域」「都市」の日付・時刻に変換されて表示されます。

「現在時刻を設定」ボタンをタップすると、現在選択されている「国・地域」「都市」の現在時刻が入力されます。


## 対応言語 Language

現在、日本語と英語に対応しています。
他の言語に対応したい場合は、下記ファイルを新規作成し、/i18n に追加してください。

* country.{language}.json
* timezone.{language}.json
* Message_{language}.json

また、[jQM-DateBox](http://dev.jtsage.com/jQM-DateBox2/) から言語ファイルをダウンロードし、/i18n に追加してください。

* jquery.mobile.datebox.i18n.{language}.utf8.js


## ライセンス License

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

## 開発者 Author

[原木 正志 / Masashi Haraki](http://haraki.jp) (masa.haraki@gmail.com)
