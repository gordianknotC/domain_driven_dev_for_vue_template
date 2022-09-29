# repositories_impl

Actual implmentations of the repositories in the domain layer,
Repositories are responsible to coordinate data from the different Data Sources.

> i_repository 的實作 class，實現 repository 的行為。

# mappers

Map Entity objects to Models and vice-versa

> 轉換 model 和 entity

# models

Representation of data structure that allows us to interact with our data sources

> api return type

# data_sources

Consist of remote and local Data Sources. Remote Data Source will perform HTTP requests on the API. While local Data Source will cache or persist data.

> provide local or remote data
