# Matrix Toolbar Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## 1.0.6 - 2018-10-11
### Added
- Matrix fields in global sets will now work, thanks to new template hooks in 3.0.27. [#2](https://github.com/monachilada/craft-matrixtoolbar/issues/2) [Relevant PR #3356](https://github.com/craftcms/cms/pull/3356)

### Changed
- Craft version requirement is now ^3.0.27

## 1.0.5 - 2018-10-08
### Changed
- Fixes a javascript error that would prevent Matrix fields in global sets to break. [#2](https://github.com/monachilada/craft-matrixtoolbar/issues/2)

## 1.0.4 - 2018-10-08
### Changed
- roave/security-advisories dependency removed completely, as it was preventing installs.

## 1.0.3 - 2018-10-08
### Changed
- roave/security-advisories dependency is now dev only, fixing a composer install dependency error.

## 1.0.2 - 2018-10-08
### Changed
- Code adheres to Craft inspections and style.

## 1.0.1 - 2018-10-08 [CRITICAL]
### Changed
- Fixed a bug (and removed redundant code) that would be triggered when no fields were defined in the site, bringing down the entire CP. [#1](https://github.com/monachilada/craft-matrixtoolbar/issues/1)

## 1.0.0 - 2018-10-07
### Added
- Initial release
