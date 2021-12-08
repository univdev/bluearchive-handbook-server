# 자연어 러닝
## 개요
이 폴더는 ```node-nlp``` 라이브러리를 이용하여 자연어 학습을 편하게 진행할 수 있도록 설게 되었습니다.
## 사용법
### 디렉토리 기반 응답
질문에 대한 응답으로 트리 구조의 디렉토리 명칭을 점(.)으로 연결지은 문자열이 반환됩니다.
```
commands
  ㄴ characters
    ㄴ iori
      ㄴ skills
    ㄴ shun
```
iori 폴더의 skills를 리턴한다면, ```characters.iori.skills``` 형태의 문자열로 반환됩니다.
> 폴더 이름에 점 문자를 넣지 마세요!
### 명사 기재
commands 폴더 내부에는 ```names.txt``` 파일을 추가할 수 있습니다.
```
commands
  ㄴ characters
    ㄴ iori
      ㄴ names.txt
        | 이오리
        | 관통 인권캐
      ㄴ skills
    ㄴ shun
      ㄴ names.txt
        | 슌
        | 폭발 인권캐
```
```names.txt```파일에는 디렉토리에 해당하는 **사용자가 실제로 부를법한 명칭**을 기재합니다.

사용자가 만약 아래와 같이 질문한다면,
```
관통 캐릭터중에서 인권캐가 뭐야?
```
아래와 같은 응답이 반환될 것입니다.
```
characters.iori
```
### 질문 기재
commands 폴더 내부에는 ```questions.txt``` 파일을 추가할 수 있습니다.
```
commands
  ㄴ characters
    ㄴ iori
        ㄴ names.txt
          | 이오리
          | 관통 인권캐
      ㄴ skills
        ㄴ names.txt
          | 스킬
          | 기술
          | 능력
        ㄴ questions.txt
          | 어떻게 찍어?
          | 어떤 순서로 올려?
    ㄴ shun
      ㄴ names.txt
        | 슌
        | 폭발 인권캐
```
```questions.txt```파일에는 해당 디렉토리를 응답으로 내보내기 위해 **사용자가 실제로 질문할만한 문장**을 기재합니다.

사용자가 만약 아래와 같이 질문한다면,
```
이오리 스킬 순서좀 알려줘
```
아래와 같은 응답이 나올 것입니다.
```
characters.iori.skills
```
