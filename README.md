
# Virtual Bookshelf
実際の本棚のように､表紙ではなく背表紙がズラッと表示できるサイトです

## できること
- ISBNを入力して半自動的に本の登録､編集､削除､更新が可能
- 本の表紙の画像も表示(登録枚数はとっても少ない)
- OAuth(Google Github)によるログイン
- 本のstateを積読 読書中 既読から選択できる

## 未実装
- カメラでバーコード読み取り
- もうちょっとマシな見た目
- 本のsearch
- 本のsort(登録順､著者順､出版社順､自由)
- Filter機能
## 動画
![test](https://github.com/nasubi916/nuxtContentsTest/assets/104073343/d4be4521-0db5-44e3-88f8-9927a5306a48)

## 目標
- Supabaseを使ってみる
- Voltaによるissueドリブン開発
- openDBを使ってAPIへの理解度を深める
- Nuxt UIでUIに割り振る脳のリソースを必要最低限にする
- MVPを設定して､短期的なプロジェクト(イテレーション的な)をぶん回す

##  シーケンス図
### ログイン･サインイン及び初回ロード
```mermaid
sequenceDiagram
  participant line_2 as app
  participant line_3 as supabase/auth
    participant line_1 as supabase/database
  alt Cookieにログイン履歴が残っていない場合
    line_2 ->> line_3: プロバイダー名(Google or Github)を送る
    Note right of line_2: signInWithOAuth
    line_3 ->> line_3: BlackBoxな処理
    line_3 -->> line_2: user_idが返される
    Note left of line_3: redirectTo( /confirm
  end
  line_2 ->> line_1: user_idを送る
  activate line_2
  Note right of line_2: getUserISBNsData
  line_1 -->> line_2: 一致するレコードのみを返す(RLS)
  deactivate line_2
  Note left of line_1: UserISBNs[]
  line_2 ->> line_1: レコードのCRUDを監視する
  Note right of line_2: startSubscribe

```

## 本の書影表示
```mermaid
sequenceDiagram
  participant line_2 as app
    participant line_1 as supabase/database
  participant line_3 as 国立国会図書館/書影API
  line_2 ->> line_2: 本の詳細を開く
  Note over line_2, line_2: OpenModal
  alt 画像データがあるなら
    line_2 ->> line_3: GET: ISBNを送る
    line_3 ->> line_2: 200 OK: 画像データを返す
    Note left of line_3: JPEG形式
  else 画像データが無ければ
    line_3 ->> line_2: 404 Not Found: エラーメッセージを返す
    alt 画像データがあるなら
      line_2 ->> line_1: book_data.coverを参照する
      line_1 ->> line_2: 画像Linkを送る
    else 画像データが無いなら
      line_1 ->> line_2: ダミー画像を送る
    end
  end
```

## 本の登録 (更新･再取得･削除もほとんど一緒)
```mermaid
sequenceDiagram
  participant line_2 as app
    participant line_1 as supabase/database
  participant line_4 as openDB
  activate line_2
    line_2 ->> line_4: 入力されたISBNを送る
    Note right of line_2: getBookData(ISBN)
    line_4 -->> line_2: BookResponse型で全情報がResponseされる
    Note left of line_4: BookResponse[]
    opt
      line_2 ->> line_2: 情報の変更
    end
    line_2 ->> line_1: confirmしたらBookData型に整形して､DBにinsertする
    Note right of line_2: addBook(newUserBook)
```