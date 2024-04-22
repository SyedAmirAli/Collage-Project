import os from "os";

// find out the ip address of internet router/provider device
function getIpV4(availableIp = "") {
  const nets = os.networkInterfaces();

  let ipV4 = "";

  for (const net of Object.values(nets)) {
    if (Array.isArray(net)) {
      for (const netData of net) {
        var isIpV4 = netData.address.startsWith("192.168");
        if (isIpV4) ipV4 = netData.address;
      }
    }
  }

  // console.log(JSON.stringify({ nets }));

  switch (availableIp) {
    case "":
      return ipV4;

    case "MY_WIFI":
      return "192.168.31.95";

    case "MY_HOTSPOT":
      return "192.168.237.6";

    default:
      return ipV4;
  }
}

export default getIpV4;
/* 
function ip() {
  const nets = os.networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  console.log(JSON.stringify(results));
}

const mobile = {
  nets: {
    lo: [
      {
        address: "127.0.0.1",
        netmask: "255.0.0.0",
        family: "IPv4",
        mac: "00:00:00:00:00:00",
        internal: true,
        cidr: "127.0.0.1/8",
      },
      {
        address: "::1",
        netmask: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
        family: "IPv6",
        mac: "00:00:00:00:00:00",
        internal: true,
        cidr: "::1/128",
        scopeid: 0,
      },
    ],
    wlp1s0: [
      {
        address: "192.168.237.6",
        netmask: "255.255.255.0",
        family: "IPv4",
        mac: "b4:69:21:7e:26:24",
        internal: false,
        cidr: "192.168.237.6/24",
      },
      {
        address: "2400:c600:3358:bef3:cd54:19fa:f8b4:33cc",
        netmask: "ffff:ffff:ffff:ffff::",
        family: "IPv6",
        mac: "b4:69:21:7e:26:24",
        internal: false,
        cidr: "2400:c600:3358:bef3:cd54:19fa:f8b4:33cc/64",
        scopeid: 0,
      },
      {
        address: "2400:c600:3358:bef3:caa0:886d:b566:2179",
        netmask: "ffff:ffff:ffff:ffff::",
        family: "IPv6",
        mac: "b4:69:21:7e:26:24",
        internal: false,
        cidr: "2400:c600:3358:bef3:caa0:886d:b566:2179/64",
        scopeid: 0,
      },
      {
        address: "fe80::d3cb:e3d0:6f96:50db",
        netmask: "ffff:ffff:ffff:ffff::",
        family: "IPv6",
        mac: "b4:69:21:7e:26:24",
        internal: false,
        cidr: "fe80::d3cb:e3d0:6f96:50db/64",
        scopeid: 3,
      },
    ],
  },
};

const wifi = {
  nets: {
    lo: [
      {
        address: "127.0.0.1",
        netmask: "255.0.0.0",
        family: "IPv4",
        mac: "00:00:00:00:00:00",
        internal: true,
        cidr: "127.0.0.1/8",
      },
      {
        address: "::1",
        netmask: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
        family: "IPv6",
        mac: "00:00:00:00:00:00",
        internal: true,
        cidr: "::1/128",
        scopeid: 0,
      },
    ],
    wlp1s0: [
      {
        address: "192.168.31.95",
        netmask: "255.255.255.0",
        family: "IPv4",
        mac: "b4:69:21:7e:26:24",
        internal: false,
        cidr: "192.168.31.95/24",
      },
      {
        address: "fe80::ce69:6336:2a49:a4d7",
        netmask: "ffff:ffff:ffff:ffff::",
        family: "IPv6",
        mac: "b4:69:21:7e:26:24",
        internal: false,
        cidr: "fe80::ce69:6336:2a49:a4d7/64",
        scopeid: 3,
      },
    ],
  },
  nets: {
    lo: [
      {
        address: "127.0.0.1",
        netmask: "255.0.0.0",
        family: "IPv4",
        mac: "00:00:00:00:00:00",
        internal: true,
        cidr: "127.0.0.1/8",
      },
      {
        address: "::1",
        netmask: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
        family: "IPv6",
        mac: "00:00:00:00:00:00",
        internal: true,
        cidr: "::1/128",
        scopeid: 0,
      },
    ],
    wlp1s0: [
      {
        address: "192.168.237.6",
        netmask: "255.255.255.0",
        family: "IPv4",
        mac: "b4:69:21:7e:26:24",
        internal: false,
        cidr: "192.168.237.6/24",
      },
      {
        address: "2400:c600:3358:bef3:de78:a25e:87f1:d377",
        netmask: "ffff:ffff:ffff:ffff::",
        family: "IPv6",
        mac: "b4:69:21:7e:26:24",
        internal: false,
        cidr: "2400:c600:3358:bef3:de78:a25e:87f1:d377/64",
        scopeid: 0,
      },
      {
        address: "2400:c600:3358:bef3:caa0:886d:b566:2179",
        netmask: "ffff:ffff:ffff:ffff::",
        family: "IPv6",
        mac: "b4:69:21:7e:26:24",
        internal: false,
        cidr: "2400:c600:3358:bef3:caa0:886d:b566:2179/64",
        scopeid: 0,
      },
      {
        address: "fe80::d3cb:e3d0:6f96:50db",
        netmask: "ffff:ffff:ffff:ffff::",
        family: "IPv6",
        mac: "b4:69:21:7e:26:24",
        internal: false,
        cidr: "fe80::d3cb:e3d0:6f96:50db/64",
        scopeid: 3,
      },
    ],
  },
};
 */
