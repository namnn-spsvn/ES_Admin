
"use client";
import React from "react";

interface Props {
    currentIndex: number;
    total: number;
}

export default function ContentProgress({ currentIndex, total }: Props) {
    return (
        <div style={{ marginBottom: 16 }}>
            <p>
                Câu {currentIndex + 1} / {total}
            </p>
            <div style={{ height: 8, background: "#eee", borderRadius: 4 }}>
                <div
                    style={{
                        width: `${((currentIndex + 1) / total) * 100}%`,
                        height: "100%",
                        background: "#6a11cb",
                        borderRadius: 4,
                    }}
                />
            </div>
        </div>
    );
}
