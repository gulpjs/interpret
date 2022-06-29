# Changelog

### [3.1.1](https://www.github.com/gulpjs/interpret/compare/v3.1.0...v3.1.1) (2022-06-29)


### Bug Fixes

* Include cjs-stub in npm bundle ([4f7d798](https://www.github.com/gulpjs/interpret/commit/4f7d7981565a704af9ded99eb953faa1a838f8af))

## [3.1.0](https://www.github.com/gulpjs/interpret/compare/v3.0.0...v3.1.0) (2022-06-29)


### Features

* Add `.cts` to support typescript 4.7 ([#90](https://www.github.com/gulpjs/interpret/issues/90)) ([c1ffa36](https://www.github.com/gulpjs/interpret/commit/c1ffa36fbd1088f2dbdb00c9500eecfce70eafc0))

## [3.0.0](https://www.github.com/gulpjs/interpret/compare/v2.2.0...v3.0.0) (2022-04-12)


### ⚠ BREAKING CHANGES

* Provide default configuration in register functions (#83)
* Only load sucrase tsx hook for `.tsx` extension
* Normalize repository, dropping node <10.13 support (#80)
* Remove legacy node-jsx hook
* Remove deprecated typescript-node hook
* Remove deprecated typescript-register hook
* Remove unmaintained typescript-require hook
* Replace legacy require-yaml with yaml-hook
* Remove legacy require-xml support
* Remove legacy/deprecated babel hooks
* Remove legacy buble support
* Remove legacy cirru-script support
* Remove legacy node-cjsx support
* Remove legacy coco support
* Remove legacy/deprecated coffeescript hooks
* Remove legacy require-csv support
* Remove legacy earlgrey support
* Remove legacy iced-coffee-script support
* Remove legacy require-ini support
* Remove legacy json5 hook
* Remove legacy livescript support
* Remove legacy wisp support
* Drop legacy loaders & extensions (#79)
* Ensure babel only transforms files that match the full extension

### Features

* Add `.cjs` extension and stub hook ([#75](https://www.github.com/gulpjs/interpret/issues/75)) ([7989161](https://www.github.com/gulpjs/interpret/commit/7989161ba5c9ac4e99ec17043b73e525e8e07874))
* Add `@swc/register` as a loader for `.ts` and `.tsx` extensions ([#74](https://www.github.com/gulpjs/interpret/issues/74)) ([f160451](https://www.github.com/gulpjs/interpret/commit/f160451b720ea1b0db4a1f66a646fca9758e71ad))
* Add esbuild-register for typescript extensions ([#77](https://www.github.com/gulpjs/interpret/issues/77)) ([963f5fa](https://www.github.com/gulpjs/interpret/commit/963f5fadb0b01a0640c52b68f4d76480fdbf70eb))
* Add new extensions as JS variants ([8a8df59](https://www.github.com/gulpjs/interpret/commit/8a8df595afc2b813f48e5a87c0f6f88b17f746a7))
* Add sucrase hook as alternative for `.jsx` ([58f678e](https://www.github.com/gulpjs/interpret/commit/58f678e78c81fb953b50935cdefbc78bf6d3b77f))
* Add support for `.esbuild.(js|jsx|ts|tsx)` extensions ([fcb9672](https://www.github.com/gulpjs/interpret/commit/fcb967211180216f3ddd0358e8634e9ee5c955fd))
* Add support for `.sucrase.(js|jsx|ts|tsx)` extensions ([216ad12](https://www.github.com/gulpjs/interpret/commit/216ad128fdf0a774b81297729d1d17c2b2ff4893))
* Add support for `.swc.(js|jsx|ts|tsx)` extensions ([c054cf2](https://www.github.com/gulpjs/interpret/commit/c054cf2e5322e7306f8bbf6778956d97d65e37a1))
* Allow register function configuration to be overridden ([7856f7e](https://www.github.com/gulpjs/interpret/commit/7856f7ef812bae3cc609db15e3e98dff3a0cd536))
* Leverage endsWith instead of RegExp in matchers ([#82](https://www.github.com/gulpjs/interpret/issues/82)) ([6404724](https://www.github.com/gulpjs/interpret/commit/6404724bc9814540aaa46a680c165eac0c1f32d9))
* Provide default configuration in register functions ([#83](https://www.github.com/gulpjs/interpret/issues/83)) ([7856f7e](https://www.github.com/gulpjs/interpret/commit/7856f7ef812bae3cc609db15e3e98dff3a0cd536))
* Support `.babel.(jsx|tsx)` extensions ([1e3d0f8](https://www.github.com/gulpjs/interpret/commit/1e3d0f81c0aa96e6ea084a75a54af2bf3be53aef))
* Support `.mdx` extension hook ([#85](https://www.github.com/gulpjs/interpret/issues/85)) ([cd24c39](https://www.github.com/gulpjs/interpret/commit/cd24c39f38742adf8339183adf24d548479810f0))


### Bug Fixes

* Apply correct ordering to esbuild-register ([fcfbdb4](https://www.github.com/gulpjs/interpret/commit/fcfbdb44477c6ed063a22a9ce3b972698479da3b))
* Ensure babel only transforms files that match the full extension ([81ed502](https://www.github.com/gulpjs/interpret/commit/81ed5024b1d961029320a048036f7a559d11cdac))
* Ensure esbuild-register only applies to ts or tsx files ([5680b3f](https://www.github.com/gulpjs/interpret/commit/5680b3fbd5f08a23807f23d500d222b056cfe542))
* Only load sucrase tsx hook for `.tsx` extension ([e9376a1](https://www.github.com/gulpjs/interpret/commit/e9376a18587b5c73f5f1cb5fa60fa73b8fab3a96))


### Miscellaneous Chores

* Drop legacy loaders & extensions ([#79](https://www.github.com/gulpjs/interpret/issues/79)) ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Normalize repository, dropping node <10.13 support ([#80](https://www.github.com/gulpjs/interpret/issues/80)) ([7b69c63](https://www.github.com/gulpjs/interpret/commit/7b69c632592dfe3e84332ee27eec28805c23a30e))
* Remove deprecated typescript-node hook ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove deprecated typescript-register hook ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy buble support ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy cirru-script support ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy coco support ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy earlgrey support ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy iced-coffee-script support ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy json5 hook ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy livescript support ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy node-cjsx support ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy node-jsx hook ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy require-csv support ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy require-ini support ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy require-xml support ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy wisp support ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy/deprecated babel hooks ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove legacy/deprecated coffeescript hooks ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Remove unmaintained typescript-require hook ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
* Replace legacy require-yaml with yaml-hook ([18a0319](https://www.github.com/gulpjs/interpret/commit/18a0319c0d53c4c33a8ce9badca4d6cfe98cb314))
