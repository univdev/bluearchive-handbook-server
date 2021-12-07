# /skills
## 제공 항목
- 캐릭터별 스킬
- 스킬트리 추천
## Endpoints
### /skills
```
Query String

- [String] character: 한국어 캐릭터 이름 (ex: 이오리)
```
```
Response

{
  character: [String] 캐릭터 이름
  skills: {
    ex: [String] 스킬 설명
    normal: [String] 스킬 설명
    special: [String] 스킬 설명
    sub: [String] 스킬 설명
  }
}
```