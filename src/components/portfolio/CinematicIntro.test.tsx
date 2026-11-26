import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CinematicIntro } from "./CinematicIntro";

vi.mock("./ParticleScene", () => ({ ParticleScene: () => null }));

function motionPreference(reduced: boolean) {
  vi.stubGlobal("matchMedia", () => ({ matches: reduced, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
}

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); window.history.replaceState({}, "", "/"); });

describe("Cinematic opening", () => {
  it("automatically enters the portfolio within the requested 3–4 seconds", () => {
    vi.useFakeTimers();
    motionPreference(false);
    const complete = vi.fn();
    render(<CinematicIntro onComplete={complete} />);
    vi.advanceTimersByTime(3799);
    expect(complete).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(complete).toHaveBeenCalledTimes(1);
  });
  it("lets visitors skip immediately", () => {
    motionPreference(false);
    const complete = vi.fn();
    render(<CinematicIntro onComplete={complete} />);
    fireEvent.click(screen.getByRole("button", { name: /skip intro/i }));
    expect(complete).toHaveBeenCalledTimes(1);
  });
  it("bypasses animation when reduced motion is requested", () => {
    motionPreference(true);
    const complete = vi.fn();
    render(<CinematicIntro onComplete={complete} />);
    expect(complete).toHaveBeenCalledTimes(1);
  });
  it("does not delay visitors following a section link", () => {
    motionPreference(false);
    window.history.replaceState({}, "", "/#certifications");
    const complete = vi.fn();
    render(<CinematicIntro onComplete={complete} />);
    expect(complete).toHaveBeenCalledTimes(1);
  });
});