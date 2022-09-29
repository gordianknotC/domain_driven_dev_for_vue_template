# bloc
business logic (BLOC)
> 商業操作邏輯

# components

> 組件

# pages

> 頁面

# theme

> 主題


# utils
> utils for presentation only
> 其他地方不要存取 presentation utils

如果該 utils 不只用在 presentation 也用在 domain, 則選擇放在 Domain中，並以 service expose 出來
如果該 utils presentation 有使用，domain 也有使用，切屬於單純的 app 層級，考慮放在 third_parties / utils 裡面，以後如果有獨立分層需要時，便可以直接把 third_parties / utils 獨立出來便可
