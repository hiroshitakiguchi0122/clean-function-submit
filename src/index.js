//タスクを分散し、1つの関数で1つのタスクを完結させるように。
// - API に POST するデータを作成する関数
// - 実際に POST する関数
// - 一連の流れをハンドリングする関数
// と分割することで、関数の役割が明確になりコードの可読性を向上することができます。
async function submitBlogPost() {
  let result;
  const sendData = getSendData();

  try {
    setLoadingState("LOADING");

    const url = "/blog-post";
    result = await sendPostMethod(url, sendData);

    setLoadingState("DONE");
  } catch (error) {
    setLoadingState("FAIL");
    setErrorMessage(error);
  }

  return result;
}

function getSendData() {
  const inputTitle = getUserInputTitle(); // ユーザーからの入力を取得
  const inputBody = getUserInputBody(); // ユーザーからの入力を取得

  // POST送信する際のデータを定義
  return (sendData = {
    title: inputTitle,
    body: inputBody,
  });
}

async function sendPostMethod(url, sendData) {
  // POST送信をしている
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(sendData),
  });

  // HTTPステータスコードが200番代以外の場合はエラーを発生させる
  if (result.status < 200 && 300 <= result.status) {
    throw new Error(result.message);
  }

  return await response.json();
}

// 関数を小さくすることで様々なメリットがあります。
// 1. 汎用性を持たせることができる
// 2. 影響範囲を限定することができる
// 3. 人のコードを読む際の負担を減らすことができる
