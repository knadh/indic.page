# Indic.page

[Indic.page](https://indic.page) is a directory of Indic (Indian) language computing resources.

[![image](https://user-images.githubusercontent.com/547147/99902921-19644000-2ce7-11eb-96bf-99bda2c68507.png)](https://indic.page)

## Contributing

All resources are listed in the [data.yml](data.yml) file. To add a new resource or change something, submit a PR with a patch to it. The website will be updated automatically upon merge.

Tag open source resources as `FOSS` and non-open source resources as `Proprietary`.


## Building locally
The website is a set of static HTML pages that are automatically generated from the Jinja template file `template.html`. The static assets are in the `static` directory.

1. Clone the repo.
2. `pip install -r requirements.txt`
3. `python build.py` to generate the static site into the `site` directory.

## License
The repository, data, and the static site generated are licensed under the Creative Commons Attribution-ShareAlike License.
