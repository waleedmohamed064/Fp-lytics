import { useMemo, useState } from "react";
import { adminUsers } from "./dashboardData";
import {
  Ban,
  BadgeCheck,
  Database,
  Download,
  Edit3,
  HeartPulse,
  Plane,
  RefreshCw,
  Search,
  UserCog,
  UserPlus,
  X,
} from "lucide-react";

const INITIAL_ENTITIES = [
  {
    id: 101,
    name: "Haaland, E.",
    uid: "#9B42A",
    franchise: "MCI",
    position: "FWD",
    valuation: 15.2,
    status: "Active",
  },
  {
    id: 102,
    name: "Saka, B.",
    uid: "#1129X",
    franchise: "ARS",
    position: "MID",
    valuation: 10.1,
    status: "Active",
  },
  {
    id: 103,
    name: "De Bruyne, K.",
    uid: "#4492C",
    franchise: "MCI",
    position: "MID",
    valuation: 10.5,
    status: "Injured",
  },
  {
    id: 104,
    name: "Salah, M.",
    uid: "#7731Y",
    franchise: "LIV",
    position: "MID",
    valuation: 12.7,
    status: "Active",
  },
];

const PAGE_SIZE = 3;

function AdminPage() {
  const [users, setUsers] = useState(adminUsers.map((user) => ({ ...user })));
  const [entities, setEntities] = useState(INITIAL_ENTITIES);
  const [selectedEntityId, setSelectedEntityId] = useState(INITIAL_ENTITIES[1].id);
  const [statusMessage, setStatusMessage] = useState("Changes are staged. Commit when ready.");
  const [searchValue, setSearchValue] = useState("");
  const [valuationInput, setValuationInput] = useState(INITIAL_ENTITIES[1].valuation.toFixed(1));
  const [selectedFlag, setSelectedFlag] = useState("Active");
  const [adminView, setAdminView] = useState("users");
  const [positionFilter, setPositionFilter] = useState("All");
  const [usersPage, setUsersPage] = useState(0);
  const [notes, setNotes] = useState("");

  const selectedEntity = useMemo(() => {
    return entities.find((entity) => entity.id === selectedEntityId) || entities[0];
  }, [selectedEntityId, entities]);

  const filteredUsers = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    });
  }, [searchValue, users]);

  const filteredEntities = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return entities.filter((entity) => {
      const matchesPosition = positionFilter === "All" || entity.position === positionFilter;
      const matchesQuery =
        !query ||
        entity.name.toLowerCase().includes(query) ||
        entity.uid.toLowerCase().includes(query) ||
        entity.franchise.toLowerCase().includes(query);

      return matchesPosition && matchesQuery;
    });
  }, [entities, positionFilter, searchValue]);

  const usersPageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentUsersPage = Math.min(usersPage, usersPageCount - 1);
  const paginatedUsers = filteredUsers.slice(
    currentUsersPage * PAGE_SIZE,
    currentUsersPage * PAGE_SIZE + PAGE_SIZE,
  );

  const exportRowsAsCsv = (rows, fileName) => {
    if (!rows.length) {
      setStatusMessage("No rows available to export.");
      return;
    }

    const headers = Object.keys(rows[0]);
    const escapeCsv = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csv = [headers.join(","), ...rows.map((row) => headers.map((key) => escapeCsv(row[key])).join(","))].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setStatusMessage(`Exported ${rows.length} rows to ${fileName}.`);
  };

  const handleDeployUpdate = () => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setStatusMessage(`Deployment initiated at ${time}.`);
  };

  const handleAddUser = () => {
    const nextId = Math.max(...users.map((user) => user.id), 0) + 1;
    const newUser = {
      id: nextId,
      name: `New User ${nextId}`,
      email: `user${nextId}@fplytics.com`,
      role: "Free",
      status: "Active",
      uid: `#U${1000 + nextId}`,
      lastLogin: "Never",
      valuation: "0.0",
    };

    setUsers((previousUsers) => [newUser, ...previousUsers]);
    setStatusMessage(`Added ${newUser.name}.`);
    setUsersPage(0);
  };

  const handleAddEntity = () => {
    const nextId = Math.max(...entities.map((entity) => entity.id), 100) + 1;
    const newEntity = {
      id: nextId,
      name: `Entity ${nextId}`,
      uid: `#${nextId}X`,
      franchise: "MCI",
      position: "MID",
      valuation: 6.5,
      status: "Active",
    };

    setEntities((previousEntities) => [newEntity, ...previousEntities]);
    setSelectedEntityId(newEntity.id);
    setValuationInput(newEntity.valuation.toFixed(1));
    setSelectedFlag(newEntity.status);
    setStatusMessage(`Added ${newEntity.name}.`);
  };

  const handleEditUser = (user) => {
    setAdminView("players");
    setStatusMessage(`Switched to Player Database edit mode from ${user.name}.`);
  };

  const handleLoadNextBatch = () => {
    const nextId = Math.max(...entities.map((entity) => entity.id), 100) + 1;
    const batch = [
      {
        id: nextId,
        name: `Batch Player ${nextId}`,
        uid: `#${nextId}B`,
        franchise: "ARS",
        position: "DEF",
        valuation: 5.3,
        status: "Active",
      },
      {
        id: nextId + 1,
        name: `Batch Player ${nextId + 1}`,
        uid: `#${nextId + 1}B`,
        franchise: "LIV",
        position: "FWD",
        valuation: 8.8,
        status: "Injured",
      },
    ];

    setEntities((previousEntities) => [...previousEntities, ...batch]);
    setStatusMessage(`Loaded ${batch.length} new entities.`);
  };

  const handleCloseDrawer = () => {
    setAdminView("users");
    setStatusMessage("Closed edit drawer.");
  };

  const handleCancelDrawer = () => {
    if (!selectedEntity) {
      return;
    }

    setValuationInput(selectedEntity.valuation.toFixed(1));
    setSelectedFlag(selectedEntity.status);
    setNotes("");
    setStatusMessage(`Reverted staged changes for ${selectedEntity.name}.`);
  };

  const handleCommitChanges = () => {
    const parsedValuation = Number.parseFloat(valuationInput);
    if (!selectedEntity || Number.isNaN(parsedValuation)) {
      setStatusMessage("Provide a valid valuation before committing.");
      return;
    }

    setEntities((previousEntities) =>
      previousEntities.map((entity) =>
        entity.id === selectedEntity.id
          ? {
              ...entity,
              valuation: parsedValuation,
              status: selectedFlag,
            }
          : entity,
      ),
    );

    setStatusMessage(`Committed ${selectedEntity.name}: ${selectedFlag}, GBP ${parsedValuation.toFixed(1)}m.`);
  };

  const roleBadge = (role) => {
    if (role === "Super Admin") {
      return (
        <span className="inline-flex rounded-full border border-[#6a4f8b] bg-[#3a244f] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200">
          {role}
        </span>
      );
    }

    return (
      <span
        className={`text-sm font-semibold ${
          role === "Pro" ? "text-emerald-300" : "text-slate-400"
        }`}
      >
        {role}
      </span>
    );
  };

  const statusBadge = (status) => {
    const isActive = status === "Active";
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ${
          isActive
            ? "bg-emerald-500/12 text-emerald-200"
            : "bg-rose-500/12 text-rose-200"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            isActive ? "bg-emerald-400" : "bg-rose-400"
          }`}
        />
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0820] p-3 sm:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-[1440px] rounded-[28px] border border-[#342348] bg-[#170d27] shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
        <div
          className={`grid min-h-[760px] ${
            adminView === "players"
              ? "xl:grid-cols-[220px_minmax(0,1fr)_340px]"
              : "xl:grid-cols-[220px_minmax(0,1fr)]"
          }`}
        >
          <aside className="border-b border-[#2d1f40] bg-[#151024] p-5 xl:border-b-0 xl:border-r">
            <h2 className="text-lg font-bold text-emerald-300">FPLytics Admin</h2>

            <div className="mt-8 space-y-2">
              <button
                onClick={() => setAdminView("users")}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  adminView === "users"
                    ? "bg-emerald-400/12 text-emerald-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <UserCog size={16} />
                User Management
              </button>
              <button
                onClick={() => setAdminView("players")}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  adminView === "players"
                    ? "bg-emerald-400/12 text-emerald-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Database size={16} />
                Player Database
              </button>
            </div>

            <button
              onClick={handleDeployUpdate}
              className="mt-12 w-full rounded-xl border border-[#5f4a7a] bg-[#352846] px-4 py-3 text-sm font-semibold text-slate-200"
            >
              Deploy Update
            </button>
          </aside>

          <main className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative w-full max-w-sm">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={15}
                />
                <input
                  value={searchValue}
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                    setUsersPage(0);
                  }}
                  placeholder={
                    adminView === "users" ? "Search system..." : "Query entities..."
                  }
                  className="w-full rounded-xl border border-[#2f2045] bg-[#120b1f] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    exportRowsAsCsv(
                      adminView === "users" ? filteredUsers : filteredEntities,
                      adminView === "users" ? "admin-users.csv" : "admin-entities.csv",
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-[#3b2a54] px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-300"
                >
                  <Download size={14} />
                  Export CSV
                </button>
                <button
                  onClick={adminView === "users" ? handleAddUser : handleAddEntity}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-bold text-[#072015]"
                >
                  <UserPlus size={14} />
                  {adminView === "users" ? "Add User" : "Add Entity"}
                </button>
              </div>
            </div>

            <div className="mt-5">
              {adminView === "users" ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                    Root_Access
                  </p>
                  <h1 className="mt-2 text-4xl font-bold text-white">User Management</h1>
                  <p className="mt-2 text-sm text-slate-400">
                    Manage system administrators, professional analysts, and free-tier users
                    across the platform.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                    Live System Status
                  </p>
                  <h1 className="mt-2 text-5xl font-bold leading-[0.95] text-white">
                    Database
                    <br />
                    Manager
                  </h1>
                  <p className="mt-3 max-w-lg text-sm text-slate-400">
                    Direct manipulation interface for entity statistics, pricing structures, and
                    dynamic status flags.
                  </p>
                </>
              )}
            </div>

            {adminView === "users" ? (
              <div className="mt-6 rounded-2xl border border-[#2f2045] bg-[#1d1330]">
                <table className="w-full text-sm">
                  <thead className="border-b border-[#2f2045]">
                    <tr className="text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      <th className="px-5 py-4">Name</th>
                      <th className="px-5 py-4">Email</th>
                      <th className="px-5 py-4">Role</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Last Login</th>
                      <th className="px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user) => {
                      const initials = user.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase();

                      return (
                        <tr
                          key={user.id}
                          onClick={() => {
                            setStatusMessage(`Selected ${user.name}.`);
                          }}
                          className="cursor-pointer border-b border-[#2f2045]/80 text-slate-200 transition hover:bg-[#24183a]"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#2f2342] text-xs font-bold text-slate-300">
                                {initials}
                              </span>
                              <span className="font-semibold text-slate-100">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-400">{user.email}</td>
                          <td className="px-5 py-4">{roleBadge(user.role)}</td>
                          <td className="px-5 py-4">{statusBadge(user.status)}</td>
                          <td className="px-5 py-4 text-xs text-slate-400">{user.lastLogin}</td>
                          <td className="px-5 py-4">
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                handleEditUser(user);
                              }}
                              className="rounded-lg border border-[#4f3a69] px-3 py-1.5 text-xs font-semibold text-slate-300"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="flex items-center justify-between px-5 py-4 text-xs text-slate-400">
                  <span>
                    Showing {currentUsersPage * PAGE_SIZE + 1} to{" "}
                    {Math.min((currentUsersPage + 1) * PAGE_SIZE, filteredUsers.length)} of{" "}
                    {filteredUsers.length} users
                  </span>
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => setUsersPage((current) => Math.max(current - 1, 0))}
                      disabled={currentUsersPage === 0}
                      className="hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setUsersPage((current) =>
                          Math.min(current + 1, usersPageCount - 1),
                        )
                      }
                      disabled={currentUsersPage >= usersPageCount - 1}
                      className="hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="inline-flex rounded-xl bg-[#2a1a3f] p-1">
                  {["All", "GKP", "DEF", "MID", "FWD"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setPositionFilter(option)}
                      className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                        positionFilter === option
                          ? "bg-[#45305d] text-slate-100"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {filteredEntities.map((entity) => (
                    <button
                      key={entity.id}
                      onClick={() => {
                        setSelectedEntityId(entity.id);
                        setValuationInput(entity.valuation.toFixed(1));
                        setSelectedFlag(entity.status);
                        setStatusMessage(`Editing ${entity.name}.`);
                      }}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                        selectedEntityId === entity.id
                          ? "border-emerald-400/50 bg-[#2a183e]"
                          : "border-[#2f2045] bg-[#1d1330] hover:border-[#4b3565]"
                      }`}
                    >
                      <div className="grid items-center gap-2 text-xs text-slate-400 sm:grid-cols-[1.2fr_70px_70px_1fr_40px]">
                        <div>
                          <p className="text-lg font-semibold text-slate-100">{entity.name}</p>
                          <p className="text-[11px] text-slate-500">UID: {entity.uid}</p>
                        </div>
                        <span className="rounded bg-[#2f2442] px-2 py-1 text-center text-[11px] font-semibold text-slate-300">
                          {entity.franchise}
                        </span>
                        <span className="text-center text-[11px] font-semibold text-slate-300">
                          {entity.position}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-slate-200">
                            GBP {entity.valuation.toFixed(1)}m
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] ${
                              entity.status === "Injured" || entity.status === "Suspended"
                                ? "bg-rose-500/15 text-rose-200"
                                : "bg-emerald-500/15 text-emerald-200"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                entity.status === "Injured" || entity.status === "Suspended"
                                  ? "bg-rose-400"
                                  : "bg-emerald-400"
                              }`}
                            />
                            {entity.status}
                          </span>
                        </div>
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#3f2a56] text-slate-200">
                          <Edit3 size={12} />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleLoadNextBatch}
                  className="mx-auto inline-flex items-center gap-2 rounded-xl border border-[#3e2a57] bg-[#1b132c] px-5 py-2.5 text-sm font-semibold text-slate-300"
                >
                  <RefreshCw size={13} />
                  Load Next Batch
                </button>
              </div>
            )}
          </main>

          {adminView === "players" ? (
            <aside className="border-t border-[#2d1f40] bg-[#1c132e] p-5 xl:border-l xl:border-t-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Edit Entity</p>
                  <p className="text-xs text-emerald-300">UID: {selectedEntity.uid}</p>
                </div>
                <button
                  onClick={handleCloseDrawer}
                  className="rounded-md p-1 text-slate-500 transition hover:text-slate-300"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-5 rounded-xl border border-[#2f2045] bg-[#130d21] p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Target Entity</p>
                <p className="mt-2 text-3xl font-bold text-slate-100">{selectedEntity.name}</p>
                <div className="mt-2 flex gap-1">
                  <span className="rounded bg-[#2f2442] px-2 py-1 text-[10px] font-semibold text-slate-300">
                    {selectedEntity.franchise}
                  </span>
                  <span className="rounded bg-[#2f2442] px-2 py-1 text-[10px] font-semibold text-slate-300">
                    {selectedEntity.position}
                  </span>
                </div>
              </div>

              <label className="mt-5 block">
                <span className="text-xs text-slate-400">Current Valuation</span>
                <div className="mt-2 rounded-xl border border-[#2f2045] bg-[#130d21] px-3 py-2 text-slate-100">
                  <span className="mr-2 text-lg">GBP</span>
                  <input
                    value={valuationInput}
                    onChange={(event) => setValuationInput(event.target.value)}
                    className="w-[120px] bg-transparent text-lg font-semibold outline-none"
                  />
                </div>
              </label>

              <div className="mt-5">
                <p className="text-xs text-slate-400">Status Override Flag</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    { label: "Active", icon: BadgeCheck },
                    { label: "Injured", icon: HeartPulse },
                    { label: "Suspended", icon: Ban },
                    { label: "Unavailable", icon: Plane },
                  ].map((flag) => {
                    const Icon = flag.icon;
                    const isSelected = selectedFlag === flag.label;

                    return (
                      <button
                        key={flag.label}
                        onClick={() => {
                          setSelectedFlag(flag.label);
                          setStatusMessage(`Staged status flag: ${flag.label}.`);
                        }}
                        className={`rounded-xl border p-3 text-left transition ${
                          isSelected
                            ? "border-emerald-400 bg-emerald-400/10 text-emerald-200"
                            : "border-[#2f2045] bg-[#130d21] text-slate-300 hover:border-emerald-400/40"
                        }`}
                      >
                        <Icon size={15} />
                        <p className="mt-2 text-xs font-semibold">{flag.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="mt-5 block">
                <span className="text-xs text-slate-400">SysAdmin Logs / Notes</span>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Append system notes..."
                  className="mt-2 w-full rounded-xl border border-[#2f2045] bg-[#130d21] p-3 text-sm text-slate-200 outline-none placeholder:text-slate-500"
                />
              </label>

              <p className="mt-4 rounded-xl border border-[#2f2045] bg-[#130d21] p-3 text-xs text-slate-400">
                {statusMessage}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <button
                  onClick={handleCancelDrawer}
                  className="rounded-xl border border-[#4d3a64] px-4 py-3 text-sm font-semibold text-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCommitChanges}
                  className="rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-[#072015]"
                >
                  Commit Changes
                </button>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
