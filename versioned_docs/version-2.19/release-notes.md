# <img src="images/logo.png" height="64px"/> Telepresence Release Notes

## Version 2.19.1 <span style="font-size: 16px;">(July 12)</span>
## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Add brew support for the OSS version of Telepresence.](https://github.com/telepresenceio/telepresence/issues/3609)</div></div>
<div style="margin-left: 15px">

The Open-Source Software version of Telepresence can now be installed using the brew formula via <code>brew install datawire/blackbird/telepresence-oss</code>.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add --create-namespace flag to the telepresence helm install command.</div></div>
<div style="margin-left: 15px">

A <code>--create-namespace</code> (default <code>true</code>) flag was added to the <code>telepresence helm install</code> command. No attempt will be made to create a namespace for the traffic-manager if it is explicitly set to <code>false</code>. The command will then fail if the namespace is missing.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Introduce DNS fallback on Windows.</div></div>
<div style="margin-left: 15px">

A <code>network.defaultDNSWithFallback</code> config option has been introduced on Windows. It will cause the DNS-resolver to fall back to the resolver that was first in the list prior to when Telepresence establishes a connection. The option is default <code>true</code> since it is believed to give the best experience but can be set to <code>false</code> to restore the old behavior.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Brew now supports MacOS (amd64/arm64) / Linux (amd64)](https://github.com/datawire/homebrew-blackbird/issues/19)</div></div>
<div style="margin-left: 15px">

The brew formula can now dynamically support MacOS (amd64/arm64) / Linux (amd64) in a single formula
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add ability to provide an externally-provisioned webhook secret</div></div>
<div style="margin-left: 15px">

Added <code>supplied</code> as a new option for <code>agentInjector.certificate.method</code>. This fully disables the generation of the Mutating Webhook's secret, allowing the chart to use the values of a pre-existing secret named <code>agentInjector.secret.name</code>. Previously, the install would fail when it attempted to create or update the externally-managed secret.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Let PTR query for DNS server return the cluster domain.</div></div>
<div style="margin-left: 15px">

The <code>nslookup</code> program on Windows uses a PTR query to retrieve its displayed "Server" property. This Telepresence DNS resolver will now return the cluster domain on such a query.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add scheduler name to PODs templates.</div></div>
<div style="margin-left: 15px">

A new Helm chart value <code>schedulerName</code> has been added. With this feature, we are able to define some particular schedulers from Kubernetes to apply some different strategies to allocate telepresence resources, including the Traffic Manager and hooks pods.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Race in traffic-agent injector when using inject annotation</div></div>
<div style="margin-left: 15px">

Applying multiple deployments that used the <code>telepresence.getambassador.io/inject-traffic-agent: enabled</code> would cause a race condition, resulting in a large number of created pods that eventually had to be deleted, or sometimes in pods that didn't contain a traffic agent.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Fix configuring custom agent security context</div></div>
<div style="margin-left: 15px">

-> The traffic-manager helm chart will now correctly use a custom agent security context if one is provided.
</div>

## Version 2.19.0 <span style="font-size: 16px;">(June 15)</span>
## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Warn when an Open Source Client connects to an Enterprise Traffic Manager.</div></div>
<div style="margin-left: 15px">

The difference between the OSS and the Enterprise offering is not well understood, and OSS users often install a traffic-manager using the Helm chart published at getambassador.io. This Helm chart installs an enterprise traffic-manager, which is probably not what the user would expect. Telepresence will now warn when an OSS client connects to an enterprise traffic-manager and suggest switching to an enterprise client, or use <code>telepresence helm install</code> to install an OSS traffic-manager.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add scheduler name to PODs templates.</div></div>
<div style="margin-left: 15px">

A new Helm chart value <code>schedulerName</code> has been added. With this feature, we are able to define some particular schedulers from Kubernetes to apply some different strategies to allocate telepresence resources, including the Traffic Manager and hooks pods.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Improve traffic-manager performance in very large clusters.</div></div>
<div style="margin-left: 15px">

-> The traffic-manager will now use a shared-informer when keeping track of deployments. This will significantly reduce the load on the Kublet in large clusters and therefore lessen the risk for the traffic-manager being throttled, which can lead to other problems.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Kubeconfig exec authentication failure when connecting with --docker from a WSL linux host</div></div>
<div style="margin-left: 15px">

Clusters like Amazon EKS often use a special authentication binary that is declared in the kubeconfig using an <code>exec</code> authentication strategy. This binary is normally not available inside a container. Consequently, a modified kubeconfig is used when <code>telepresence connect --docker</code> executes, appointing a <code>kubeauth </code> binary which instead retrieves the authentication from a port on the Docker host that communicates with another process outside of Docker. This process then executes the original <code>exec</code> command to retrieve the necessary credentials.
This setup was problematic when using WSL, because even though <code>telepresence connect --docker</code> was executed on a Linux host, the Docker host available from <code>host.docker.internal</code> that the <code>kubeauth</code> connected to was the Windows host running Docker Desktop. The fix for this was to use the local IP of the default route instead of <code>host.docker.internal</code> when running under WSL..
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Fix bug in workload cache, causing endless recursion when a workload uses the same name as its owner.</div></div>
<div style="margin-left: 15px">

The workload cache was keyed by name and namespace, but not by kind, so a workload named the same as its owner workload would be found using the same key. This led to the workload finding itself when looking up its owner, which in turn resulted in an endless recursion when searching for the topmost owner.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">FailedScheduling events mentioning node availability considered fatal when waiting for agent to arrive.</div></div>
<div style="margin-left: 15px">

The traffic-manager considers some events as fatal when waiting for a traffic-agent to arrive after an injection has been initiated. This logic would trigger on events like &quot;Warning FailedScheduling 0/63 nodes are available&quot; although those events indicate a recoverable condition and kill the wait. This is now fixed so that the events are logged but the wait continues.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Improve how the traffic-manager resolves DNS when no agent is installed.</div></div>
<div style="margin-left: 15px">

The traffic-manager is typically installed into a namespace different from the one that clients are connected to. It's therefore important that the traffic-manager adds the client's namespace when resolving single label names in situations where there are any agents to dispatch the DNS query to.
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Removal of ability import legacy artifact into Helm.</div></div>
<div style="margin-left: 15px">

A helm install would make attempts to find manually installed artifacts and make them managed by Helm by adding the necessary labels and annotations. This was important when the Helm chart was first introduced but is far less so today, and this legacy import was therefore removed.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Docker aliases deprecation caused failure to detect Kind cluster.](https://docs.docker.com/engine/deprecated/#container-short-id-in-network-aliases-field)</div></div>
<div style="margin-left: 15px">

The logic for detecting if a cluster is a local Kind cluster, and therefore needs some special attention when using <code>telepresence connect --docker</code>, relied on the presence of <code>Aliases</code> in the Docker network that a Kind cluster sets up. In Docker versions from 26 and up, this value is no longer used, but the corresponding info can instead be found in the new <code>DNSNames</code> field.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Include svc as a top-level domain in the DNS resolver.](https://github.com/telepresenceio/telepresence/issues/2814)</div></div>
<div style="margin-left: 15px">

It's not uncommon that use-cases involving Kafka or other middleware use FQNs that end with &quot;svc&quot;. The core-DNS resolver in Kubernetes can resolve such names. With this bugfix, the Telepresence DNS resolver will also be able to resolve them, and thereby remove the need to add &quot;.svc&quot; to the include-suffix list.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add ability to enable/disable the mutating webhook.</div></div>
<div style="margin-left: 15px">

A new Helm chart boolean value <code>agentInjector.enable</code> has been added that controls the agent-injector service and its associated mutating webhook. If set to <code>false</code>, the service, the webhook, and the secrets and certificates associated with it, will no longer be installed.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add ability to mount a webhook secret.</div></div>
<div style="margin-left: 15px">

A new Helm chart value <code>agentInjector.certificate.accessMethod</code> which can be set to <code>watch</code> (the default) or <code>mount</code> has been added. The <code>mount</code> setting is intended for clusters with policies that prevent containers from doing a <code>get</code>, <code>list</code> or <code>watch</code> of a <code>Secret</code>, but where a latency of up to 90 seconds is acceptable between the time the secret is regenerated and the agent-injector picks it up.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Make it possible to specify ignored volume mounts using path prefix.</div></div>
<div style="margin-left: 15px">

Volume mounts like <code>/var/run/secrets/kubernetes.io</code> are not declared in the workload. Instead, they are injected during pod-creation and their names are generated. It is now possible to ignore such mounts using a matching path prefix.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Make the telemount Docker Volume plugin configurable</div></div>
<div style="margin-left: 15px">

A <code>telemount</code> object was added to the <code>intercept</code> object in <code>config.yml</code> (or Helm value <code>client.intercept</code>), so that the automatic download and installation of this plugin can be fully customised.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add option to load the kubeconfig yaml from stdin during connect.</div></div>
<div style="margin-left: 15px">

This allows another process with a kubeconfig already loaded in memory to directly pass it to <code>telepresence connect</code> without needing a separate file. Simply use a dash "-" as the filename for the <code>--kubeconfig</code> flag.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add ability to specify agent security context.</div></div>
<div style="margin-left: 15px">

A new Helm chart value <code>agent.securityContext</code> that will allow configuring the security context of the injected traffic agent.  The value can be set to a valid Kubernetes securityContext object, or can be set to an empty value (<code>{}</code>) to ensure the agent has no defined security context.  If no value is specified, the traffic manager will set the agent's security context to the same as the first container's of the workload being injected into.
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Tracing is no longer enabled by default.</div></div>
<div style="margin-left: 15px">

Tracing must now be enabled explicitly in order to use the <code>telepresence gather-traces</code> command.
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Removal of timeouts that are no longer in use</div></div>
<div style="margin-left: 15px">

The <code>config.yml</code> values <code>timeouts.agentInstall</code> and <code>timeouts.apply</code> haven't been in use since versions prior to 2.6.0, when the client was responsible for installing the traffic-agent. These timeouts are now removed from the code-base, and a warning will be printed when attempts are made to use them.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Search all private subnets to find one open for dnsServerSubnet</div></div>
<div style="margin-left: 15px">

This resolves a bug that did not test all subnets in a private range, sometimes resulting in the warning, "DNS doesn't seem to work properly."
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Docker aliases deprecation caused failure to detect Kind cluster.</div></div>
<div style="margin-left: 15px">

The logic for detecting if a cluster is a local Kind cluster, and therefore needs some special attention when using <code>telepresence connect --docker</code>, relied on the presence of <code>Aliases</code> in the Docker network that a Kind cluster sets up. In Docker versions from 26 and up, this value is no longer used, but the corresponding info can instead be found in the new <code>DNSNames</code> field.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Creation of individual pods was blocked by the agent-injector webhook.</div></div>
<div style="margin-left: 15px">

An attempt to create a pod was blocked unless it was provided by a workload. Hence, commands like <code>kubectl run -i busybox --rm --image=curlimages/curl --restart=Never -- curl echo-easy.default</code> would be blocked from executing.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Fix panic due to root daemon not running.</div></div>
<div style="margin-left: 15px">

If a <code>telepresence connect</code> was made at a time when the root daemon was not running (an abnormal condition) and a subsequent intercept was then made, a panic would occur when the port-forward to the agent was set up. This is now fixed so that the initial <code>telepresence connect</code> is refused unless the root daemon is running.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Get rid of telemount plugin stickiness</div></div>
<div style="margin-left: 15px">

The <code>datawire/telemount</code> that is automatically downloaded and installed, would never be updated once the installation was made. Telepresence will now check for the latest release of the plugin and cache the result of that check for 24 hours. If a new version arrives, it will be installed and used.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Use route instead of address for CIDRs with masks that don't allow "via"</div></div>
<div style="margin-left: 15px">

A CIDR with a mask that leaves less than two bits (/31 or /32 for IPv4) cannot be added as an address to the VIF, because such addresses must have bits allowing a "via" IP.
The logic was modified to allow such CIDRs to become static routes, using the VIF base address as their "via", rather than being VIF addresses in their own right.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Containerized daemon created cache files owned by root</div></div>
<div style="margin-left: 15px">

When using <code>telepresence connect --docker</code> to create a containerized daemon, that daemon would sometimes create files in the cache that were owned by root, which then caused problems when connecting without the <code>--docker</code> flag.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Remove large number of requests when traffic-manager is used in large clusters.</div></div>
<div style="margin-left: 15px">

The traffic-manager would make a very large number of API requests during cluster start-up or when many services were changed for other reasons. The logic that did this was refactored and the number of queries were significantly reduced.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Don't patch probes on replaced containers.</div></div>
<div style="margin-left: 15px">

A container that is being replaced by a <code>telepresence intercept --replace</code> invocation will have no liveness-, readiness, nor startup-probes. Telepresence didn't take this into consideration when injecting the traffic-agent, but now it will refrain from patching symbolic port names of those probes.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Don't rely on context name when deciding if a kind cluster is used.</div></div>
<div style="margin-left: 15px">

The code that auto-patches the kubeconfig when connecting to a kind cluster from within a docker container, relied on the context name starting with "kind-", but although all contexts created by kind have that name, the user is still free to rename it or to create other contexts using the same connection properties. The logic was therefore changed to instead look for a loopback service address.
</div>

## Version 2.18.0 <span style="font-size: 16px;">(February  9)</span>
## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Include the image for the traffic-agent in the output of the version and status commands.</div></div>
<div style="margin-left: 15px">

The version and status commands will now output the image that the traffic-agent will be using when injected by the agent-injector.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Custom DNS using the client DNS resolver.</div></div>
<div style="margin-left: 15px">

<p>A new <code>telepresence connect --proxy-via CIDR=WORKLOAD</code> flag was introduced, allowing Telepresence to translate DNS responses matching specific subnets into virtual IPs that are used locally. Those virtual IPs are then routed (with reverse translation) via the pod's of a given workload. This makes it possible to handle custom DNS servers that resolve domains into loopback IPs. The flag may also be used in cases where the cluster's subnets are in conflict with the workstation's VPN.</p> <p>The CIDR can also be a symbolic name that identifies a subnet or list of subnets:</p><table> <tr><td><code>also</code></td><td>All subnets added with --also-proxy</td></tr> <tr><td><code>service</code></td><td>The cluster's service subnet</td></tr> <tr><td><code>pods</code></td><td>The cluster's pod subnets.</td></tr> <tr><td><code>all</code></td><td>All of the above.</td></tr> </table>
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Ensure that agent.appProtocolStrategy is propagated correctly.</div></div>
<div style="margin-left: 15px">

The <code>agent.appProtocolStrategy</code> was inadvertently dropped when moving license related code fromm the OSS repository the repository for the Enterprise version of Telepresence. It has now been restored.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Include non-default zero values in output of telepresence config view.</div></div>
<div style="margin-left: 15px">

The <code>telepresence config view</code> command will now print zero values in the output when the default for the value is non-zero.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Restore ability to run the telepresence CLI in a docker container.</div></div>
<div style="margin-left: 15px">

The improvements made to be able to run the telepresence daemon in docker using <code>telepresence connect --docker</code> made it impossible to run both the CLI and the daemon in docker. This commit fixes that and also ensures that the user- and root-daemons are merged in this scenario when the container runs as root.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Remote mounts when intercepting with the --replace flag.</div></div>
<div style="margin-left: 15px">

A <code>telepresence intercept --replace</code> did not correctly mount all volumes, because when the intercepted container was removed, its mounts were no longer visible to the agent-injector when it was subjected to a second invocation. The container is now kept in place, but with an image that just sleeps infinitely.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Intercepting with the --replace flag will no longer require all subsequent intercepts to use --replace.</div></div>
<div style="margin-left: 15px">

A <code>telepresence intercept --replace</code> will no longer switch the mode of the intercepted workload, forcing all subsequent intercepts on that workload to use <code>--replace</code> until the agent is uninstalled. Instead, <code>--replace</code> can be used interchangeably just like any other intercept flag.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Kubeconfig exec authentication with context names containing colon didn't work on Windows</div></div>
<div style="margin-left: 15px">

The logic added to allow the root daemon to connect directly to the cluster using the user daemon as a proxy for exec type authentication in the kube-config, didn't take into account that a context name sometimes contains the colon ":" character. That character cannot be used in filenames on windows because it is the drive letter separator.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Provide agent name and tag as separate values in Helm chart</div></div>
<div style="margin-left: 15px">

The <code>AGENT_IMAGE</code> was a concatenation of the agent's name and tag. This is now changed so that the env instead contains an <code>AGENT_IMAGE_NAME</code> and <code>AGENT_INAGE_TAG</code>. The <code>AGENT_IMAGE </code> is removed. Also, a new env <code>REGISTRY</code> is added, where the registry of the traffic- manager image is provided. The <code>AGENT_REGISTRY</code> is no longer required and will default to <code>REGISTRY</code> if not set.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Environment interpolation expressions were prefixed twice.</div></div>
<div style="margin-left: 15px">

Telepresence would sometimes prefix environment interpolation expressions in the traffic-agent twice so that an expression that looked like <code>$(SOME_NAME)</code> in the app-container, ended up as <code> $(_TEL_APP_A__TEL_APP_A_SOME_NAME)</code> in the corresponding expression in the traffic-agent.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Panic in root-daemon on darwin workstations with full access to cluster network.</div></div>
<div style="margin-left: 15px">

A darwin machine with full access to the cluster's subnets will never create a TUN-device, and a check was missing if the device actually existed, which caused a panic in the root daemon.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Show allow-conflicting-subnets in telepresence status and telepresence config view.</div></div>
<div style="margin-left: 15px">

The <code>telepresence status</code> and <code>telepresence config view</code> commands didn't show the <code>allowConflictingSubnets</code> CIDRs because the value wasn't propagated correctly to the CLI.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">It is now possible use a host-based connection and containerized connections simultaneously.</div></div>
<div style="margin-left: 15px">

Only one host-based connection can exist because that connection will alter the DNS to reflect the namespace of the connection. but it's now possible to create additional connections using <code>--docker</code> while retaining the host-based connection.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Ability to set the hostname of a containerized daemon.</div></div>
<div style="margin-left: 15px">

The hostname of a containerized daemon defaults to be the container's ID in Docker. You now can override the hostname using <code>telepresence connect --docker --hostname &lt;a name&gt;</code>.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">New <code>--multi-daemon</code>flag to enforce a consistent structure for the status command output.</div></div>
<div style="margin-left: 15px">

The output of the <code>telepresence status</code> when using <code>--output json</code> or <code>--output yaml</code> will either show an object where the <code>user_daemon</code> and <code>root_daemon</code> are top level elements, or when multiple connections are used, an object where a <code>connections</code> list contains objects with those daemons. The flag <code>--multi-daemon</code> will enforce the latter structure even when only one daemon is connected so that the output can be parsed consistently. The reason for keeping the former structure is to retain backward compatibility with existing parsers.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Make output from telepresence quit more consistent.</div></div>
<div style="margin-left: 15px">

A quit (without -s) just disconnects the host user and root daemons but will quit a container based daemon. The message printed was simplified to remove some have/has is/are errors caused by the difference.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Fix &quot;tls: bad certificate&quot; errors when refreshing the mutator-webhook secret</div></div>
<div style="margin-left: 15px">

The <code>agent-injector</code> service will now refresh the secret used by the <code>mutator-webhook</code> each time a new connection is established, thus preventing the certificates to go out-of-sync when the secret is regenerated.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Keep telepresence-agents configmap in sync with pod states.</div></div>
<div style="margin-left: 15px">

An intercept attempt that resulted in a timeout due to failure of injecting the traffic-agent left the <code>telepresence-agents</code> configmap in a state that indicated that an agent had been added, which caused problems for subsequent intercepts after the problem causing the first failure had been fixed.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">The <code>telepresence status</code> command will now report the status of all running daemons.</div></div>
<div style="margin-left: 15px">

A <code>telepresence status</code>, issued when multiple containerized daemons were active, would error with &quot;multiple daemons are running, please select one using the --use &lt;match&gt; flag&quot;. This is now fixed so that the command instead reports the status of all running daemons.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">The <code>telepresence version</code> command will now report the version of all running daemons.</div></div>
<div style="margin-left: 15px">

A <code>telepresence version</code>, issued when multiple containerized daemons were active, would error with &quot;multiple daemons are running, please select one using the --use &lt;match&gt; flag&quot;. This is now fixed so that the command instead reports the version of all running daemons.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Multiple containerized daemons can now be disconnected using <code>telepresence quit -s</code></div></div>
<div style="margin-left: 15px">

A <code>telepresence quit -s</code>, issued when multiple containerized daemons were active, would error with &quot;multiple daemons are running, please select one using the --use &lt;match&gt; flag&quot;. This is now fixed so that the command instead quits all daemons.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">The DNS search path on Windows is now restored when Telepresence quits</div></div>
<div style="margin-left: 15px">

The DNS search path that Telepresence uses to simulate the DNS lookup functionality in the connected cluster namespace was not removed by a <code>telepresence quit</code>, resulting in connectivity problems from the workstation. Telepresence will now remove the entries that it has added to the search list when it quits.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">The user-daemon would sometimes get killed when used by multiple simultaneous CLI clients.</div></div>
<div style="margin-left: 15px">

The user-daemon would die with a fatal &quot;fatal error: concurrent map writes&quot; error in the <code>connector.log</code>, effectively killing the ongoing connection.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Multiple services ports using the same target port would not get intercepted correctly.</div></div>
<div style="margin-left: 15px">

Intercepts didn't work when multiple service ports were using the same container port. Telepresence would think that one of the ports wasn't intercepted and therefore disable the intercept of the container port.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Root daemon refuses to disconnect.</div></div>
<div style="margin-left: 15px">

The root daemon would sometimes hang forever when attempting to disconnect due to a deadlock in the VIF-device.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Fix panic in user daemon when traffic-manager was unreachable</div></div>
<div style="margin-left: 15px">

The user daemon would panic if the traffic-manager was unreachable. It will now instead report a proper error to the client.
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Removal of backward support for versions predating 2.6.0</div></div>
<div style="margin-left: 15px">

The telepresence helm installer will no longer discover and convert workloads that were modified by versions prior to 2.6.0. The traffic manager will and no longer support the muxed tunnels used in versions prior to 2.5.0.
</div>

## Version 2.17.0 <span style="font-size: 16px;">(November 14)</span>
## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Additional Prometheus metrics to track intercept/connect activity</div></div>
<div style="margin-left: 15px">

This feature adds the following metrics to the Prometheus endpoint: <code>connect_count</code>, <code>connect_active_status</code>, <code>intercept_count</code>, and <code>intercept_active_status</code>. These are labeled by client/install_id. Additionally, the <code>intercept_count</code> metric has been renamed to <code>active_intercept_count</code> for clarity.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Make the Telepresence client docker image configurable.</div></div>
<div style="margin-left: 15px">

The docker image used when running a Telepresence intercept in docker mode can now be configured using the setting <code>images.clientImage</code> and will default first to the value of the environment <code> TELEPRESENCE_CLIENT_IMAGE</code>, and then to the value preset by the telepresence binary. This configuration setting is primarily intended for testing purposes.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Use traffic-agent port-forwards for outbound and intercepted traffic.</div></div>
<div style="margin-left: 15px">

The telepresence TUN-device is now capable of establishing direct port-forwards to a traffic-agent in the connected namespace. That port-forward is then used for all outbound traffic to the device, and also for all traffic that arrives from intercepted workloads. Getting rid of the extra hop via the traffic-manager improves performance and reduces the load on the traffic-manager. The feature can only be used if the client has Kubernetes port-forward permissions to the connected namespace. It can be disabled by setting <code> cluster.agentPortForward</code> to <code>false</code> in <code>config.yml</code>.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Improve outbound traffic performance.</div></div>
<div style="margin-left: 15px">

The root-daemon now communicates directly with the traffic-manager instead of routing all outbound traffic through the user-daemon. The root-daemon uses a patched kubeconfig where <code>exec</code> configurations to obtain credentials are dispatched to the user-daemon. This to ensure that all authentication plugins will execute in user-space. The old behavior of routing everything through the user-daemon can be restored by setting <code>cluster.connectFromRootDaemon</code> to <code>false</code> in <code>config.yml</code>.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">New networking CLI flag --allow-conflicting-subnets</div></div>
<div style="margin-left: 15px">

telepresence connect (and other commands that kick off a connect) now accepts an --allow-conflicting-subnets CLI flag. This is equivalent to client.routing.allowConflictingSubnets in the helm chart, but can be specified at connect time. It will be appended to any configuration pushed from the traffic manager.
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Warn if large version mismatch between traffic manager and client.</div></div>
<div style="margin-left: 15px">

Print a warning if the minor version diff between the client and the traffic manager is greater than three.
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">The authenticator binary was removed from the docker image.</div></div>
<div style="margin-left: 15px">

The <code>authenticator</code> binary, used when serving proxied <code>exec</code> kubeconfig credential retrieval, has been removed. The functionality was instead added as a subcommand to the <code>telepresence </code> binary.
</div>

## Version 2.16.1 <span style="font-size: 16px;">(October 12)</span>
## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add --docker-debug flag to the telepresence intercept command.</div></div>
<div style="margin-left: 15px">

This flag is similar to <code>--docker-build</code> but will start the container with more relaxed security using the <code>docker run</code> flags <code>--security-opt apparmor=unconfined --cap-add SYS_PTRACE</code>.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add a --export option to the telepresence connect command.</div></div>
<div style="margin-left: 15px">

In some situations it is necessary to make some ports available to the host from a containerized telepresence daemon. This commit adds a repeatable <code>--expose &lt;docker port exposure&gt;</code> flag to the connect command.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Prevent agent-injector webhook from selecting from kube-xxx namespaces.</div></div>
<div style="margin-left: 15px">

The <code>kube-system</code> and <code>kube-node-lease</code> namespaces should not be affected by a global agent-injector webhook by default. A default <code>namespaceSelector</code> was therefore added to the Helm Chart <code>agentInjector.webhook</code> that contains a <code>NotIn</code> preventing those namespaces from being selected.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Backward compatibility for pod template TLS annotations.</div></div>
<div style="margin-left: 15px">

Users of Telepresence < 2.9.0 that make use of the pod template TLS annotations were unable to upgrade because the annotation names have changed (now prefixed by "telepresence."), and the environment expansion of the annotation values was dropped. This fix restores support for the old names (while retaining the new ones) and the environment expansion.
</div>

## <div style="display:flex;"><img src="images/security.png" alt="security" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Built with go 1.21.3</div></div>
<div style="margin-left: 15px">

Built Telepresence with go 1.21.3 to address CVEs.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Match service selector against pod template labels</div></div>
<div style="margin-left: 15px">

When listing intercepts (typically by calling <code>telepresence list</code>) selectors of services are matched against workloads. Previously the match was made against the labels of the workload, but now they are matched against the labels pod template of the workload. Since the service would actually be matched against pods this is more correct. The most common case when this makes a difference is that statefulsets now are listed when they should.
</div>

## Version 2.16.0 <span style="font-size: 16px;">(October  2)</span>
## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">The helm sub-commands will no longer start the user daemon.</div></div>
<div style="margin-left: 15px">

The <code>telepresence helm install/upgrade/uninstall</code> commands will no longer start the telepresence user daemon because there's no need to connect to the traffic-manager in order for them to execute.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Routing table race condition</div></div>
<div style="margin-left: 15px">

A race condition would sometimes occur when a Telepresence TUN device was deleted and another created in rapid succession that caused the routing table to reference interfaces that no longer existed.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Stop lingering daemon container</div></div>
<div style="margin-left: 15px">

When using <code>telepresence connect --docker</code>, a lingering container could be present, causing errors like &quot;The container name NN is already in use by container XX ...&quot;. When this happens, the connect logic will now give the container some time to stop and then call <code>docker stop NN</code> to stop it before retrying to start it.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add file locking to the Telepresence cache</div></div>
<div style="margin-left: 15px">

Files in the Telepresence cache are accesses by multiple processes. The processes will now use advisory locks on the files to guarantee consistency.
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Lock connection to namespace</div></div>
<div style="margin-left: 15px">

The behavior changed so that a connected Telepresence client is bound to a namespace. The namespace can then not be changed unless the client disconnects and reconnects. A connection is also given a name. The default name is composed from <code>&lt;kube context name&gt;-&lt;namespace&gt;</code> but can be given explicitly when connecting using <code>--name</code>. The connection can optionally be identified using the option <code>--use &lt;name match&gt;</code> (only needed when docker is used and more than one connection is active).
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Deprecation of global --context and --docker flags.</div></div>
<div style="margin-left: 15px">

The global flags <code>--context</code> and <code>--docker</code> will now be considered deprecated unless used with commands that accept the full set of Kubernetes flags (e.g. <code>telepresence connect</code>).
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Deprecation of the --namespace flag for the intercept command.</div></div>
<div style="margin-left: 15px">

The <code>--namespace</code> flag is now deprecated for <code>telepresence intercept</code> command. The flag can instead be used with all commands that accept the full set of Kubernetes flags (e.g. <code>telepresence connect</code>).
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Legacy code predating version 2.6.0 was removed.</div></div>
<div style="margin-left: 15px">

The telepresence code-base still contained a lot of code that would modify workloads instead of relying on the mutating webhook installer when a traffic-manager version predating version 2.6.0 was discovered. This code has now been removed.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add `telepresence list-namespaces` and `telepresence list-contexts` commands</div></div>
<div style="margin-left: 15px">

These commands can be used to check accessible namespaces and for automation.
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Implicit connect warning</div></div>
<div style="margin-left: 15px">

A deprecation warning will be printed if a command other than <code>telepresence connect</code> causes an implicit connect to happen. Implicit connects will be removed in a future release.
</div>

## Version 2.15.1 <span style="font-size: 16px;">(September  6)</span>
## <div style="display:flex;"><img src="images/security.png" alt="security" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Rebuild with go 1.21.1</div></div>
<div style="margin-left: 15px">

Rebuild Telepresence with go 1.21.1 to address CVEs.
</div>

## <div style="display:flex;"><img src="images/security.png" alt="security" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Set security context for traffic agent</div></div>
<div style="margin-left: 15px">

Openshift users reported that the traffic agent injection was failing due to a missing security context.
</div>

## Version 2.15.0 <span style="font-size: 16px;">(August 29)</span>
## <div style="display:flex;"><img src="images/security.png" alt="security" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add ASLR to telepresence binaries</div></div>
<div style="margin-left: 15px">

ASLR hardens binary sercurity against fixed memory attacks.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Added client builds for arm64 architecture.](https://github.com/telepresenceio/telepresence/issues/3259)</div></div>
<div style="margin-left: 15px">

Updated the release workflow files in github actions to including building and publishing the client binaries for arm64 architecture.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[KUBECONFIG env var can now be used with the docker mode.](https://github.com/telepresenceio/telepresence/pull/3300)</div></div>
<div style="margin-left: 15px">

If provided, the KUBECONFIG environment variable was passed to the kubeauth-foreground service as a parameter. However, since it didn't exist, the CLI was throwing an error when using <code>telepresence connect --docker</code>.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Fix deadlock while watching workloads](https://github.com/telepresenceio/telepresence/pull/3298)</div></div>
<div style="margin-left: 15px">

The <code>telepresence list --output json-stream</code> wasn't releasing the session's lock after being stopped, including with a <code>telepresence quit</code>. The user could be blocked as a result.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Change json output of telepresence list command</div></div>
<div style="margin-left: 15px">

Replace deprecated info in the JSON output of the telepresence list command.
</div>

## Version 2.14.4 <span style="font-size: 16px;">(August 21)</span>
## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Nil pointer exception when upgrading the traffic-manager.](https://github.com/telepresenceio/telepresence/issues/3313)</div></div>
<div style="margin-left: 15px">

Upgrading the traffic-manager using <code>telepresence helm upgrade</code> would sometimes result in a helm error message <q>executing "telepresence/templates/intercept-env-configmap.yaml" at &lt;.Values.intercept.environment.excluded&gt;: nil pointer evaluating interface {}.excluded"</q>
</div>

## Version 2.14.2 <span style="font-size: 16px;">(July 26)</span>
## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Telepresence now use the OSS agent in its latest version by default.](https://github.com/telepresenceio/telepresence/issues/3271)</div></div>
<div style="margin-left: 15px">

The traffic manager admin was forced to set it manually during the chart installation.
</div>

## Version 2.14.1 <span style="font-size: 16px;">(July  7)</span>
## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Envoy's http idle timout is now configurable.</div></div>
<div style="margin-left: 15px">

A new <code>agent.helm.httpIdleTimeout</code> setting was added to the Helm chart that controls the proprietary Traffic agent's http idle timeout. The default of one hour, which in some situations would cause a lot of resource consuming and lingering connections, was changed to 70 seconds.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Add more gauges to the Traffic manager's Prometheus client.</div></div>
<div style="margin-left: 15px">

Several gauges were added to the Prometheus client to make it easier to monitor what the Traffic manager spends resources on.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Agent Pull Policy</div></div>
<div style="margin-left: 15px">

Add option to set traffic agent pull policy in helm chart.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Resource leak in the Traffic manager.</div></div>
<div style="margin-left: 15px">

Fixes a resource leak in the Traffic manager caused by lingering tunnels between the clients and Traffic agents. The tunnels are now closed correctly when terminated from the side that created them.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Fixed problem setting traffic manager namespace using the kubeconfig extension.](https://www.getambassador.io/docs/telepresence/latest/reference/config#manager)</div></div>
<div style="margin-left: 15px">

Fixes a regression introduced in version 2.10.5, making it impossible to set the traffic-manager namespace using the telepresence.io kubeconfig extension.
</div>

## Version 2.14.0 <span style="font-size: 16px;">(June 12)</span>
## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[DNS configuration now supports excludes and mappings.](https://github.com/telepresenceio/telepresence/pull/3172)</div></div>
<div style="margin-left: 15px">

The DNS configuration now supports two new fields, excludes and mappings. The excludes field allows you to exclude a given list of hostnames from resolution, while the mappings field can be used to resolve a hostname with another.
</div>

## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Added the ability to exclude environment variables</div></div>
<div style="margin-left: 15px">

Added a new config map that can take an array of environment variables that will then be excluded from an intercept that retrieves the environment of a pod.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Fixed traffic-agent backward incompatibility issue causing lack of remote mounts</div></div>
<div style="margin-left: 15px">

A traffic-agent of version 2.13.3 (or 1.13.15) would not propagate the directories under <code>/var/run/secrets</code> when used with a traffic manager older than 2.13.3.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Fixed race condition causing segfaults on rare occasions when a tunnel stream timed out.](https://github.com/telepresenceio/telepresence/pull/2963)</div></div>
<div style="margin-left: 15px">

A context cancellation could sometimes be trapped in a stream reader, causing it to incorrectly return an undefined message which in turn caused the parent reader to panic on a <code>nil</code> pointer reference.
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Routing conflict reporting.</div></div>
<div style="margin-left: 15px">

Telepresence will now attempt to detect and report routing conflicts with other running VPN software on client machines. There is a new configuration flag that can be tweaked to allow certain CIDRs to be overridden by Telepresence.
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">test-vpn command deprecated</div></div>
<div style="margin-left: 15px">

Running telepresence test-vpn will now print a deprecation warning and exit. The command will be removed in a future release. Instead, please configure telepresence for your VPN's routes.
</div>

## Version 2.13.3 <span style="font-size: 16px;">(May 25)</span>
## <div style="display:flex;"><img src="images/feature.png" alt="feature" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Add imagePullSecrets to hooks](https://github.com/telepresenceio/telepresence/pull/3079)</div></div>
<div style="margin-left: 15px">

Add .Values.hooks.curl.imagePullSecrets and .Values.hooks curl.imagePullSecrets to Helm values.
</div>

## <div style="display:flex;"><img src="images/change.png" alt="change" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Change reinvocation policy to Never for the mutating webhook</div></div>
<div style="margin-left: 15px">

The default setting of the reinvocationPolicy for the mutating webhook dealing with agent injections changed from Never to IfNeeded.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Fix mounting fail of IAM roles for service accounts web identity token](https://github.com/telepresenceio/telepresence/issues/3166)</div></div>
<div style="margin-left: 15px">

The eks.amazonaws.com/serviceaccount volume injected by EKS is now exported and remotely mounted during an intercept.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Correct namespace selector for cluster versions with non-numeric characters](https://github.com/telepresenceio/telepresence/pull/3184)</div></div>
<div style="margin-left: 15px">

The mutating webhook now correctly applies the namespace selector even if the cluster version contains non-numeric characters. For example, it can now handle versions such as Major:"1", Minor:"22+".
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Enable IPv6 on the telepresence docker network](https://github.com/telepresenceio/telepresence/issues/3179)</div></div>
<div style="margin-left: 15px">

The "telepresence" Docker network will now propagate DNS AAAA queries to the Telepresence DNS resolver when it runs in a Docker container.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Fix the crash when intercepting with --local-only and --docker-run](https://github.com/telepresenceio/telepresence/issues/3171)</div></div>
<div style="margin-left: 15px">

Running telepresence intercept --local-only --docker-run no longer  results in a panic.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[Fix incorrect error message with local-only mounts](https://github.com/telepresenceio/telepresence/issues/3171)</div></div>
<div style="margin-left: 15px">

Running telepresence intercept --local-only --mount false no longer results in an incorrect error message saying "a local-only intercept cannot have mounts".
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">[specify port in hook urls](https://github.com/telepresenceio/telepresence/pull/3161)</div></div>
<div style="margin-left: 15px">

The helm chart now correctly handles custom agentInjector.webhook.port that was not being set in hook URLs.
</div>

## <div style="display:flex;"><img src="images/bugfix.png" alt="bugfix" style="width:30px;height:fit-content;"/><div style="display:flex;margin-left:7px;">Fix wrong default value for disableGlobal and agentArrival</div></div>
<div style="margin-left: 15px">

Params .intercept.disableGlobal and .timeouts.agentArrival are now correctly honored.
</div>

