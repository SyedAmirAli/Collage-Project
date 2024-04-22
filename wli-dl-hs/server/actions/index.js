export const WATER_LEVEL_PROJECT = {
  server: "water__level__project__server__listener",
  client: "water__level__project__client__listener",
  route: (init = { baseName: "/water-level-indicator", id: "0" }) => ({
    index: init.baseName + "/",
    create: init.baseName + "/create",
    store: init.baseName + "/store",
    edit: init.baseName + "/edit/" + init.id,
    update: init.baseName + "/update/" + init.id,
    show: init.baseName + "/show/" + init.id,
    delete: init.baseName + "/delete/" + init.id,
  }),
};

export const DOOR_LOCKER_PROJECT = {
  server: "door__locker__project__server__listener",
  client: "door__locker__project__client__listener",
  route: (init = { baseName: "/door-locker", id: "0" }) => ({
    index: init.baseName + "/",
    create: init.baseName + "/create",
    store: init.baseName + "/store",
    edit: init.baseName + "/edit/" + init.id,
    update: init.baseName + "/update/" + init.id,
    show: init.baseName + "/show/" + init.id,
    delete: init.baseName + "/delete/" + init.id,
  }),
};

export const HAND_SANITIZER_PROJECT = {
  server: "hand_sanitizer__project__server__listener",
  client: "hand_sanitizer__project__client__listener",
  route: (init = { baseName: "/hand-sanitizer", id: "0" }) => ({
    index: init.baseName + "/",
    create: init.baseName + "/create",
    store: init.baseName + "/store",
    edit: init.baseName + "/edit/" + init.id,
    update: init.baseName + "/update/" + init.id,
    show: init.baseName + "/show/" + init.id,
    delete: init.baseName + "/delete/" + init.id,
  }),
};

export const FINGERPRINT_CHECKER_PROJECT = {
  server: "fingerprint__checker__project__server__listener",
  client: "fingerprint__checker__project__client__listener",
  route: (init = { baseName: "/fingerprint-checker", id: "0" }) => ({
    index: init.baseName + "/",
    create: init.baseName + "/create",
    store: init.baseName + "/store",
    edit: init.baseName + "/edit/" + init.id,
    update: init.baseName + "/update/" + init.id,
    show: init.baseName + "/show/" + init.id,
    delete: init.baseName + "/delete/" + init.id,
  }),
};

export const TASK_MANAGEMENT_PROJECT = {
  server: "task__management__project__server__listener",
  client: "task__management__project__client__listener",
  route: ({ baseName = "/task", id = "0" }) => ({
    index: baseName + "/",
    create: baseName + "/create",
    store: baseName + "/store",
    edit: baseName + "/edit/" + id,
    update: baseName + "/update/" + id,
    show: baseName + "/show/" + id,
    delete: baseName + "/delete/" + id,
  }),
};

export const NOT_SUPPORTED_LISTENER = {
  server: "not__supported__listener",
};
