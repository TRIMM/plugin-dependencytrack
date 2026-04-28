# Dependencytrack plugin

Thanks for using our plugin created for retrieving OWASP's Dependencytrack information in Backstage. This plugin is still in development.

## Installation

Run this command from the `app` package directory:

```shell
yarn add @trimm/plugin-dependencytrack
```

### New frontend system

Install the alpha entry point in apps that use Backstage's new frontend system:

```tsx
import dependencytrackPlugin from '@trimm/plugin-dependencytrack/alpha';

const app = createApp({
  features: [
    dependencytrackPlugin,
    // other plugins
  ],
});
```

The alpha entry point auto-registers:

- the Dependencytrack API client
- the summary entity card on compatible catalog entities
- the `Dependencytrack` entity tab at `/dependencytrack`

Use the root entry point if you still need the legacy app-wired extensions.

## Configuration

### Configuring the service

Add config in `app-config.yaml`.

Integration:

```yaml
dependencytrack:
  baseUrl: ${DEPENDENCYTRACK_BASE_URL}
```

Proxy:

```yaml
proxy:
  endpoints:
    '/dependencytrack':
      target: ${DEPENDENCYTRACK_BASE_URL}
      allowedMethods: ['GET']
      headers:
        X-Api-Key: ${DEPENDENCYTRACK_API_KEY}
```

Don't forget to replace the variables with the values for your specific environment.

### Add cards to overview tab

```tsx
// packages\app\src\components\catalog\EntityPage.tsx
import { EntityDependencytrackSummaryCard, EntityDependencytrackFindingCard, isDependencytrackAvailable } from '@trimm/plugin-dependencytrack';

// In the overviewContent. You can add one or both.

// Metrics card
<EntitySwitch>
    <EntitySwitch.Case if={isDependencytrackAvailable}>
    <Grid item md={6}>
        <EntityDependencytrackSummaryCard/>
    </Grid>
    </EntitySwitch.Case>
</EntitySwitch>

// Findings card
<EntitySwitch>
    <EntitySwitch.Case if={isDependencytrackAvailable}>
    <Grid item md={12}>
        <EntityDependencytrackFindingCard/>
    </Grid>
    </EntitySwitch.Case>
</EntitySwitch>
```

### New frontend system customization

If you want to install only selected Dependencytrack entity extensions in a new frontend system app, import the named exports from the alpha entry point instead of the default plugin:

```tsx
import {
  EntityDependencytrackSummaryCard,
  EntityDependencytrackFindingCard,
  EntityDependencytrackContent,
} from '@trimm/plugin-dependencytrack/alpha';
```

### Add to catalog-info.yaml

Add `dependencytrack/project-id` to your `catalog-info.yaml`:

```yaml
# Example catalog-info.yaml entity definition file
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  # ...
  annotations:
    dependencytrack/project-id: <project-id> # e63d5397-5e9e-494a-4755-368c2b1dc446
```
