/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.kie.kogito.jobs.service.repository.infinispan;

import java.util.Optional;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Instance;
import javax.enterprise.inject.Produces;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Readiness;
import org.infinispan.client.hotrod.RemoteCacheManager;
import org.kie.kogito.infinispan.health.InfinispanHealthCheck;

@ApplicationScoped
public class InfinispanConfiguration {

    public static final String PERSISTENCE_CONFIG_KEY = "kogito.jobs-service.persistence";

    /**
     * Constants for Caches
     */
    public static class Caches {

        private Caches() {

        }

        public static final String JOB_DETAILS = "JOB_DETAILS";
    }

    @Produces
    @Readiness
    public HealthCheck infinispanHealthCheck(@ConfigProperty(name = PERSISTENCE_CONFIG_KEY) Optional<String> persistence,
                                             Instance<RemoteCacheManager> cacheManagerInstance) {
        return persistence
                .filter("infinispan"::equals)
                .<HealthCheck>map(p -> new InfinispanHealthCheck(cacheManagerInstance))
                .orElse(() -> HealthCheckResponse.up("In Memory Persistence"));
    }
}