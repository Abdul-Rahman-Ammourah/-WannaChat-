
            /// Returns the `rustc` SemVer version and additional metadata
            /// like the git short hash and build date.
            pub fn version_meta() -> VersionMeta {
                VersionMeta {
                    semver: Version {
                        major: 1,
                        minor: 79,
                        patch: 0,
                        pre: vec![],
                        build: vec![],
                    },
                    host: "x86_64-pc-windows-msvc".to_owned(),
                    short_version_string: "rustc 1.79.0 (129f3b996 2024-06-10)".to_owned(),
                    commit_hash: Some("129f3b9964af4d4a709d1383930ade12dfe7c081".to_owned()),
                    commit_date: Some("2024-06-10".to_owned()),
                    build_date: None,
                    channel: Channel::Stable,
                }
            }
            