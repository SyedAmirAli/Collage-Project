export const WATER_LEVEL_PROJECT = {
  server: "water__level__project__server__listener",
  client: "water__level__project__client__listener",
  route: "/water-level-indicator",
};

export const DOOR_LOCKER_PROJECT = {
  server: "door__locker__project__server__listener",
  client: "door__locker__project__client__listener",
  route: "/door-locker",
};

export const HAND_SANITIZER_PROJECT = {
  server: "hand_sanitizer__project__server__listener",
  client: "hand_sanitizer__project__client__listener",
  route: "/hand-sanitizer",
};

export const FINGERPRINT_CHECKER_PROJECT = {
  server: "fingerprint__checker__project__server__listener",
  client: "fingerprint__checker__project__client__listener",
  route: "/fingerprint-checker",
};

export const TASK_MANAGEMENT_PROJECT = {
  server: "task_management__project__server__listener",
  client: "task_management__project__client__listener",
  route: "/task",
};

export const NOT_SUPPORTED_LISTENER = {
  server: "not__supported__listener",
};

export default class ListenerAndRouteName {
  constructor() {}

  static waterLevelNames = WATER_LEVEL_PROJECT;
  static doorLockerNames = DOOR_LOCKER_PROJECT;
  static handSanitizerNames = HAND_SANITIZER_PROJECT;
  static fingerprintCheckerNames = FINGERPRINT_CHECKER_PROJECT;
  static notSupportedNames = NOT_SUPPORTED_LISTENER;
}

export class ListenerAndRouteNames {
  constructor() {}

  static waterLevelNames = WATER_LEVEL_PROJECT;
  static doorLockerNames = DOOR_LOCKER_PROJECT;
  static handSanitizerNames = HAND_SANITIZER_PROJECT;
  static fingerprintCheckerNames = FINGERPRINT_CHECKER_PROJECT;
  static notSupportedNames = NOT_SUPPORTED_LISTENER;
}
