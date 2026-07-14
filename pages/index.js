import { useState } from 'react'

const fortunes = ['大吉', '中吉', '小吉', '末吉', '凶']
const adviceMap = {
  '大吉': '今日は積極的に行動しましょう。良いことが起きやすい日です。',
  '中吉': '無理は禁物ですが、チャンスには乗ってみてください。',
  '小吉': '慎重な行動が吉。細かい確認を忘れずに。',
  '末吉': '控えめに。周りの助けを借りると良いです。',
  '凶': '焦らず様子を見ましょう。無理をしないでください。'
}

function computeFortune(birthDateStr) {
  if (!birthDateStr) return null
  const today = new Date().toISOString().slice(0,10)
  const seedStr = birthDateStr.replace(/-/g,'') + today.replace(/-/g,'')
  let sum = 0
  for (let i = 0; i < seedStr.length; i++) sum += seedStr.charCodeAt(i)
  const idx = sum % fortunes.length
  return fortunes[idx]
}

export default function Home() {
  const [dob, setDob] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const f = computeFortune(dob)
    setResult(f)
  }

  return (
    <div className="container">
      <main>
        <h1>今日の運勢 (Tetsu)</h1>
        <form onSubmit={handleSubmit} className="form">
          <label>
            生年月日:
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </label>
          <button type="submit">占う</button>
        </form>

        {result && (
          <div className="result">
            <h2>{result}</h2>
            <p>{adviceMap[result]}</p>
          </div>
        )}
      </main>
    </div>
  )
}
