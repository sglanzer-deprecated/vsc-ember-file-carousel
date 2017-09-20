# vsc-ember-file-carousel

Cycle between related Ember files

## Installation

```
cd ~/Documents
curl --remote-name https://raw.githubusercontent.com/sglanzer/vsc-ember-file-carousel/master/vsc-ember-file-carousel-0.0.1.vsix
code --install-extension vsc-ember-file-carousel-0.0.1.vsix
```

## Features

With an Ember file in focus:
* `ctrl-shift-cmd-N` to cycle to the next related file in the project
* `ctrl-shift-cmd-P` to cycle to the previous related file in the project

### Module groups

#### Components
['component-js', 'component-hbs', 'component-css', 'component-integration-test', 'component-unit-test']

#### Helpers
['helper-js', 'helper-integration-test', 'helper-integration-test-behaviours']

#### Initializer
['initializer', 'initializer-unit-test']

#### Instance initializer
['instance-initializer', 'instance-initializer-unit-test']

#### Mixin
['mixin', 'mixin-unit-test']

#### Model / Adapter / Serializer / Transform
['model', 'model-unit-test', 'adapter-js', 'adapter-unit-test', 'serializer', 'serializer-unit-test', 'transform', 'transform-unit-test']

#### Route / Controller
['route-js', 'controller-js', 'route-hbs', 'route-css', 'route-acceptance-test', 'route-unit-test', 'controller-unit-test']

#### Service
['service', 'service-unit-test']

#### Util
['util', 'util-unit-test']
