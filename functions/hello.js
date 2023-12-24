// 서버리스 함수로 간단한 API만들기
exports.handler = async function(event, context){
    return{
        // 200 정상적인 응답
        statusCode: 200,

        // 서버리스함수로 응답시켜 줄 데이터, 
        // 문자데이터만 할당이 가능하기 때문에 객체데이터를 할당 하고 싶을 경우 stringify라는 메소드를 사용한다.
        // body: "heesu" //문자데이터 할당시
        body: JSON.stringify({ // 객체데이터 할당시
            name: 'Heesu',
            age: 100,
            email: "heesu@naver.com"
        }) 

        
    }
}

