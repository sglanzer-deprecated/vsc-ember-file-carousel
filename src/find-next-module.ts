const fs = require('fs')
const path = require('path')

const { join } = path

// TODO: Behaviour files for tests (needs blueprint updates)
const modules = {
  addon: {
    // Component
    'component-js': 'addon/components/{{name}}.js',
    'component-hbs': 'addon/templates/components/{{name}}.hbs',
    'component-css': 'addon/styles/{{name}}.css',
    'component-integration-test': 'tests/integration/components/{{name}}-test.js',
    'component-unit-test': 'tests/unit/components/{{name}}-test.js',

    // Helper
    'helper-js': 'addon/helpers/{{name}}.js',
    'helper-integration-test': 'tests/integration/helpers/{{name}}-test.js',
    'helper-integration-test-behaviours': 'tests/integration/helpers/behaviours/{{name}}-test.js',

    // Initializer
    'initializer': 'addon/initializers/{{name}}.js',
    'initializer-unit-test': 'tests/unit/initializers/{{name}}-test.js',

    // Instance initializer
    'instance-initializer': 'addon/instance-initializers/{{name}}.js',
    'instance-initializer-unit-test': 'tests/unit/instance-initializers/{{name}}-test.js',

    // Mixin
    'mixin': 'addon/mixins/{{name}}.js',
    'mixin-unit-test': 'tests/unit/mixins/{{name}}-test.js',

    // Model / Adapter / Serializer / Transform
    'model': 'addon/models/{{name}}.js',
    'model-unit-test': 'tests/unit/models/{{name}}-test.js',
    'adapter-js': 'addon/adapters/{{name}}.js',
    'adapter-unit-test': 'tests/unit/adapters/{{name}}-test.js',
    'serializer': 'adoon/serializers/{{name}}.js',
    'serializer-unit-test': 'tests/unit/serializers/{{name}}-test.js',
    'transform': 'addon/transforms/{{name}}.js',
    'transform-unit-test': 'tests/unit/transforms/{{name}}-test.js',

    // Route / Controller
    'route-js': 'addon/routes/{{name}}.js',
    'controller-js': 'addon/controllers/{{name}}.js',
    'route-hbs': 'addon/templates/{{name}}.hbs',
    'route-css': 'addon/styles/{{name}}.css',
    'route-acceptance-test': 'tests/acceptance/routes/{{name}}-test.js',
    'route-unit-test': 'tests/unit/routes/{{name}}-test.js',
    'controller-unit-test': 'tests/unit/controllers/{{name}}-test.js',

    // Service
    'service': 'addon/services/{{name}}.js',
    'service-unit-test': 'tests/unit/services/{{name}}-test.js',

    // Util
    'util': 'addon/utils/{{name}}.js',
    'util-unit-test': 'tests/unit/utils/{{name}}-test.js'
  },
  app: {
    // Component (global)
    'component-js': 'app/pods/components/{{name}}/component.js',
    'component-hbs': 'app/pods/components/{{name}}/template.hbs',
    'component-css': 'app/pods/components/{{name}}/styles.css',
    'component-integration-test': 'tests/integration/pods/components/{{name}}/component-test.js',
    'component-unit-test': 'tests/unit/pods/components/{{name}}/component-test.js',

    // Component (local)
    'local-component-js': 'app/pods/{{prefix}}-components/{{name}}/component.js',
    'local-component-hbs': 'app/pods/{{prefix}}-components/{{name}}/template.hbs',
    'local-component-css': 'app/pods/{{prefix}}-components/{{name}}/styles.css',
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
    'route-css': 'app/pods/{{name}}/styles.css',
    'route-acceptance-test': 'tests/acceptance/{{name}}-test.js',
    'route-unit-test': 'tests/unit/pods/{{name}}/route-test.js',
    'controller-unit-test': 'tests/unit/pods/{{name}}/controller-test.js',

    // Service
    'service': 'app/services/{{name}}.js',
    'service-unit-test': 'tests/unit/services/{{name}}-test.js',

    // Util
    'util': 'app/utils/{{name}}.js',
    'util-unit-test': 'tests/unit/utils/{{name}}-test.js'
  },
  dummy: {
    // Component (global)
    'component-js': 'tests/dummy/app/pods/components/{{name}}/component.js',
    'component-hbs': 'tests/dummy/app/pods/components/{{name}}/template.hbs',
    'component-css': 'tests/dummy/app/pods/components/{{name}}/styles.css',

    // Component (local)
    'local-component-js': 'tests/dummy/app/pods/{{prefix}}-components/{{name}}/component.js',
    'local-component-hbs': 'tests/dummy/app/pods/{{prefix}}-components/{{name}}/template.hbs',
    'local-component-css': 'tests/dummy/app/pods/{{prefix}}-components/{{name}}/styles.css',

    // Model / Adapter / Serializer / Transform
    'model': 'tests/dummy/app/models/{{name}}.js',
    'adapter-js': 'tests/dummy/app/adapters/{{name}}.js',
    'serializer': 'tests/dummy/app/serializers/{{name}}.js',
    'transform': 'tests/dummy/app/transforms/{{name}}.js',

    // Route / Controller
    'route-js': 'tests/dummy/app/pods/{{name}}/route.js',
    'controller-js': 'tests/dummy/app/pods/{{name}}/controller.js',
    'route-hbs': 'tests/dummy/app/pods/{{name}}/template.hbs',
    'route-css': 'tests/dummy/app/pods/{{name}}/styles.css'
  }
}

const moduleGroups = [
  ['component-js', 'component-hbs', 'component-css', 'component-integration-test', 'component-unit-test'], // Global
  ['local-component-js', 'local-component-hbs', 'local-component-css', 'local-component-integration-test', 'local-component-unit-test'], // Local
  ['helper-js', 'helper-integration-test', 'helper-integration-test-behaviours'],
  ['initializer', 'initializer-unit-test'],
  ['instance-initializer', 'instance-initializer-unit-test'],
  ['mixin', 'mixin-unit-test'],
  ['model', 'model-unit-test', 'adapter-js', 'adapter-unit-test', 'serializer', 'serializer-unit-test', 'transform', 'transform-unit-test'],
  ['route-js', 'controller-js', 'route-hbs', 'route-css', 'route-acceptance-test', 'route-unit-test', 'controller-unit-test'],
  ['service', 'service-unit-test'],
  ['util', 'util-unit-test']
]

function createPathRegex (path) {
  const pathRegex = `^${path
    .replace(/\//g, '\\/')
    .replace(/\./g, '\\.')
    .replace('{{name}}', '(?!.*-components)(.+)') // To support local components don't include -components in the name capture
    .replace('{{prefix}}', '(.+)')
  }$`
  return new RegExp(pathRegex)
}

function getModules (projectType) {
  return Object.keys(modules[projectType]).map(key => {
    return { key, path: modules[projectType][key] }
  })
}

function findModules (rootPath, projectType, filePath) {
  return getModules(projectType).reduce((matchingModules, module) => {
    const regex = createPathRegex(module.path)
    const match = regex.exec(filePath)

    if (match) {
      let name = null
      let prefix = null
      if (match.length === 3) {
        prefix = match[1]
        name = match[2]
      } else {
        name = match[1]
      }

      matchingModules.push(Object.assign({}, module, { name, prefix }))
    }

    return matchingModules
  }, [])
}

function findNextModule (rootPath, projectType, filePath) {
  let specificProjectType = projectType
  if (projectType === 'addon' && filePath.includes('dummy')) {
    specificProjectType = 'dummy'
  }

  const modules = findModules(rootPath, specificProjectType, filePath)

  if (!modules) {
    return
  }

  // In engines both the route and component groups share the same css path so
  // both modules are returned.  We need to check both module groups to find the
  // next module
  for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
    const { key, name, prefix } = modules[moduleIndex]

    const moduleGroup = moduleGroups.find(moduleGroup => moduleGroup.indexOf(key) !== -1)

    const moduleIndexInModuleGroup = moduleGroup.indexOf(key)

    let modulesChecked = 0
    let nextModuleIndex = moduleIndexInModuleGroup // Start at the source module
    let nextModulePathInstance = null
    while (modulesChecked < moduleGroup.length - 1) { // No need to loop back to the source module
      nextModuleIndex = moduleGroup.length - 1 === nextModuleIndex ? 0 : nextModuleIndex + 1 // Increment or loop back to the start

      // Check to see if the module exists in the file system
      const nextModuleKey = moduleGroup[nextModuleIndex]
      const nextModule = getModules(specificProjectType).find(module => module.key === nextModuleKey)

      // Not all project types have all the modules (e.g. dummy)
      if (nextModule) {
        const { path: nextModulePath } = nextModule
        const _nextModulePathInstance = nextModulePath.replace('{{name}}', name).replace('{{prefix}}', prefix)
        if (fs.existsSync(path.join(rootPath, _nextModulePathInstance))) {
          nextModulePathInstance = _nextModulePathInstance
          break
        }
      }

      modulesChecked = modulesChecked + 1
    }

    if (nextModulePathInstance) {
      return nextModulePathInstance
    }
  }

  return
}

export default findNextModule
