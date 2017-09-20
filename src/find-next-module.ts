const fs = require('fs')
const path = require('path')

const { join } = path

// TODO: Route / component styles
// TODO: Test behaviours
// TODO: Addons
// TODO: Engines
// TODO: Dummy apps
const modules = {
  addon: {

  },
  app: {
    // Component (global)
    'component-js': 'app/pods/components/{{name}}/component.js',
    'component-hbs': 'app/pods/components/{{name}}/template.hbs',
    'component-integration-test': 'tests/integration/pods/components/{{name}}/component-test.js',
    'component-unit-test': 'tests/unit/pods/components/{{name}}/component-test.js',

    // Component (local)
    'local-component-js': 'app/pods/{{prefix}}-components/{{name}}/component.js',
    'local-component-hbs': 'app/pods/{{prefix}}-components/{{name}}/template.hbs',
    'local-component-integration-test': 'tests/integration/pods/components/{{prefix}}-components/{{name}}/component-test.js',
    'local-component-unit-test': 'tests/unit/pods/components/{{prefix}}-components/{{name}}/component-test.js',

    // Helper
    'helper-js': 'app/helpers/{{name}}.js',
    'helper-integration-test': 'tests/integration/helpers/{{name}}-test.js',
    'helper-integration-test-behaviours': 'tests/integration/helpers/behaviours/{{name}}-test.js',

    // Initializer
    'initializer': 'app/initializers/{{name}}.js',
    'initializer-unit-test': 'tests/unit/initializers/{{name}}-test.js',

    // Instance initializer
    'instance-initializer': 'app/instance-initializers/{{name}}.js',
    'instance-initializer-unit-test': 'tests/unit/instance-initializers/{{name}}-test.js',

    // Mixin
    'mixin': 'app/mixins/{{name}}.js',
    'mixin-unit-test': 'tests/unit/mixins/{{name}}-test.js',

    // Model / Adapter / Serializer / Transform
    'model': 'app/models/{{name}}.js',
    'model-unit-test': 'tests/unit/models/{{name}}-test.js',
    'adapter-js': 'app/adapters/{{name}}.js',
    'adapter-unit-test': 'tests/unit/adapters/{{name}}-test.js',
    'serializer': 'app/serializers/{{name}}.js',
    'serializer-unit-test': 'tests/unit/serializers/{{name}}-test.js',
    'transform': 'app/transforms/{{name}}.js',
    'transform-unit-test': 'tests/unit/transforms/{{name}}-test.js',

    // Route / Controller
    'route-js': 'app/pods/{{name}}/route.js',
    'controller-js': 'app/pods/{{name}}/controller.js',
    'route-hbs': 'app/pods/{{name}}/template.hbs',
    'route-acceptance-test': 'tests/acceptance/{{name}}-test.js',
    'route-unit-test': 'tests/unit/pods/{{name}}/route-test.js',
    'controller-unit-test': 'tests/unit/pods/{{name}}/controller-test.js',

    // Service
    'service': 'app/services/{{name}}.js',
    'service-unit-test': 'tests/unit/services/{{name}}-test.js',

    // Util
    'util': 'app/utils/{{name}}.js',
    'util-unit-test': 'tests/unit/utils/{{name}}-test.js'
  }
}

const moduleGroups = [
  ['component-js', 'component-hbs', 'component-integration-test', 'component-unit-test'], // Global
  ['local-component-js', 'local-component-hbs', 'local-component-integration-test', 'local-component-unit-test'], // Local
  ['helper-js', 'helper-integration-test', 'helper-integration-test-behaviours'],
  ['initializer', 'initializer-unit-test'],
  ['instance-initializer', 'instance-initializer-unit-test'],
  ['mixin', 'mixin-unit-test'],
  ['model', 'model-unit-test', 'adapter-js', 'adapter-unit-test', 'serializer', 'serializer-unit-test', 'transform', 'transform-unit-test'],
  ['route-js', 'controller-js', 'route-hbs', 'route-acceptance-test', 'route-unit-test', 'controller-unit-test'],
  ['service', 'service-unit-test'],
  ['util', 'util-unit-test']
]

function getModules (types) {
  let _modules = []
  types.forEach(type => {
    _modules = _modules.concat(Object.keys(modules[type]).map(key => {
      return { type, key, path: modules[type][key] }
    }))
  })
  return _modules
}

function findModule (rootPath, filePath) {
  let regex = null
  const module = getModules(['app', 'addon']).find(module => {
    const pathRegex = `^${module.path
      .replace(/\//g, '\\/')
      .replace(/\./g, '\\.')
      .replace('{{name}}', '(?!.*-components)(.+)') // Don't include -components in the name capture to support local components
      .replace('{{prefix}}', '(.+)')
    }$`
    regex = new RegExp(pathRegex)
    return regex.exec(filePath)
  })

  if (module) {
    const match = regex.exec(filePath)

    let name = null
    let prefix = null
    if (match.length === 3) {
      prefix = match[1]
      name = match[2]
    } else {
      name = match[1]
    }

    return Object.assign({}, module, { name, prefix })
  }

  return
}

function findNextModule (rootPath, filePath) {
  const module = findModule(rootPath, filePath)

  if (!module) {
    return
  }

  const { type, key, name, prefix } = module

  const moduleGroup = moduleGroups
    .find(moduleGroup => moduleGroup.indexOf(key) !== -1)

  const moduleIndexInModuleGroup = moduleGroup.indexOf(key)

  let modulesChecked = 0
  let nextModuleIndex = moduleIndexInModuleGroup // Start at the source module
  let nextModulePathInstance = null
  while (modulesChecked < moduleGroup.length - 1) { // No need to loop back to the source module
    nextModuleIndex = moduleGroup.length - 1 === nextModuleIndex ? 0 : nextModuleIndex + 1 // Increment or loop back to the start

    // Check to see if the module exists in the file system
    const nextModuleKey = moduleGroup[nextModuleIndex]
    const nextModule = getModules([type]).find(module => module.key === nextModuleKey)
    const { path: nextModulePath } = nextModule
    const _nextModulePathInstance = nextModulePath.replace('{{name}}', name).replace('{{prefix}}', prefix)
    if (fs.existsSync(path.join(rootPath, _nextModulePathInstance))) {
      nextModulePathInstance = _nextModulePathInstance
      break
    }

    modulesChecked = modulesChecked + 1
  }

  return nextModulePathInstance
}

export default findNextModule
