# 🛡️ HSE AI Knowledge Base

*A free, open-source repository for Occupational Health, Safety, and Environment (HSE) regulations, hazard patterns, and risk assessment templates. Optimized for AI integration (ChatGPT/DeepSeek).*

---

## 📌 **What’s Inside?**
- **`hse_knowledge.json`**: Core database of country-specific regulations (OSHA, EU directives, etc.), hazard keywords, and HIRA templates.
- **`/examples`**: Sample queries to test integrations.

## 🚀 **Quick Start**
1. **Access the JSON API**:  
   ```bash
   curl https://<your-username>.github.io/hse-ai-db/hse_knowledge.json
2. **Use in AI prompts:**:
   "Analyze this safety scenario using my HSE rules: [TEXT].  
Regulations: https://teekaysharma.github.io/hse-ai-db/hse_knowledge.json"

🌐 GitHub Pages URL
https://teekaysharma.github.io/hse-ai-db/hse_knowledge.json

🛠️ Customization

    Edit `hse_knowledge.json directly on GitHub:

     Add new regulations:

     "Canada": {
  "CCOHS": "Canada Labour Code Part II"
}

🤖 AI Integration Examples
ChatGPT/DeepSeek Prompt:

"Act as an HSE expert. Use this knowledge base:  
https://teekaysharma.github.io/hse-ai-db/hse_knowledge.json  
Task: Identify violations in 'Workers at height without fall protection in Germany'."

Python Script:
import requests
hse_data = requests.get("https://teekaysharma.github.io/hse-ai-db/hse_knowledge.json").json()
print(hse_data["regulations"]["USA"]["OSHA"])


📂 Repository Structure
/docs
│── hse_knowledge.json       # Main HSE database
└── examples/query.json      # Sample input

💬 Need Help?

    Issues: Report bugs or request features here.

    Contribute: Submit PRs to expand regulations/hazards!
