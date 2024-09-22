"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { CrossIcon, ExternalLink, Music4, Pause, Play, Repeat, Repeat1, ShieldCloseIcon, X } from "lucide-react"; // Added X icon for close button
import { Slider } from "../ui/slider";
import { getSongsById } from "@/lib/fetch";
import Link from "next/link";
import { MusicContext } from "@/hooks/use-context";
import { toast } from "sonner";

export default function Player() {
    const [data, setData] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [visible, setVisible] = useState(true); // New state to handle player visibility
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioURL, setAudioURL] = useState("");
    const [isLooping, setIsLooping] = useState(false);

    const values = useContext(MusicContext);

    const getSong = async () => {
        const get = await getSongsById(values.music);
        const data = await get.json();
        setData(data.data[0]);
        if (data?.data[0]?.downloadUrl[2]?.url) {
            setAudioURL(data?.data[0]?.downloadUrl[2]?.url);
        } else if (data?.data[0]?.downloadUrl[1]?.url) {
            setAudioURL(data?.data[0]?.downloadUrl[1]?.url);
        } else {
            setAudioURL(data?.data[0]?.downloadUrl[0]?.url);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const togglePlayPause = () => {
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    const handleSeek = (e) => {
        const seekTime = e[0];
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const loopSong = () => {
        audioRef.current.loop = !audioRef.current.loop;
        setIsLooping(!isLooping);
        if (isLooping) {
            toast.success('Removed from Loop!');
        } else {
            toast.success('Added to Loop!');
        }
    };

    useEffect(() => {
        if (values.music) {
            getSong();
            setPlaying(true);
            const handleTimeUpdate = () => {
                try {
                    setCurrentTime(audioRef.current.currentTime);
                    setDuration(audioRef.current.duration);
                } catch (e) {
                    setPlaying(false);
                }
            };
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                }
            };
        }
    }, [values.music]);

    if (!visible) return null;

    return (
        <main className="items-center w-[90%] justify-center">
            <div>
                <audio
                    autoPlay={playing}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onLoadedData={() => setDuration(audioRef.current.duration)}
                    src={audioURL}
                    ref={audioRef}
                ></audio>
                {values.music && (
                    <div className="shadow-2xl dark:shadow-sm  fixed flex items-center jus bottom-3 w-[90%] border left-[5%] z-50 bg-background/80  p-3 md:px-10 lg:px-10 gap-4 rounded-3xl">
                        <div className="relative">
                            {/* <Button
                                size="icon"
                                variant="secondary"
                                className="h-full w-full bg-secondary/40 hover:bg-secondary/50 backdrop-blur-sm absolute z-10"
                                onClick={togglePlayPause}
                            >
                                {playing ? <Music4 className="h-6 w-6 animate-spin" /> : <Play className="h-6 w-6" />}
                            </Button> */}
                            <Link href={`/${values.music}?c=${currentTime}`}>
                                <img
                                    src={data.image ? data?.image[1]?.url : ""}
                                    alt={data?.name}
                                    className="rounded-xl h-20 min-w-20 hover:opacity-85 transition"
                                />
                            </Link>

                        </div>
                        <div className="w-full">
                            <div className="flex items-center justify-between mb-2 w-full">
                                <div>
                                    <Link href={`/${values.music}?c=${currentTime}`} className="text-base font-medium flex gap-2 items-center">
                                        {data?.name?.slice(0, 12)}
                                        {data?.name?.length >= 12 ? ".." : ""}
                                        {/* <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" /> */}
                                    </Link>
                                    <h2 className="text-xs -mt-0.5 text-muted-foreground">
                                        By <span className="font-bold">{data?.artists?.primary[0]?.name.slice(0, 15)}</span>
                                        {data?.artists?.primary[0]?.name.length >= 15 ? ".." : ""}
                                    </h2>
                                </div>

                                <div className="flex gap-2 items-center">
                                    <Button size="icon"
                                        variant="outline"
                                        onClick={togglePlayPause}
                                        className="rounded-full">

                                        {playing ? <Pause className="h-6 w-6 " /> : <Play className="h-6 w-6" />}

                                    </Button>
                                    <Button size="icon"
                                        variant="outline"
                                        onClick={() => setVisible(false)}
                                        className="rounded-full">

                                        <X className="h-4 w-4" />

                                    </Button>
                                </div>
                            </div>
                            <div className="w-full grid gap-1">
                                <Slider onValueChange={handleSeek} value={[currentTime]} max={duration} className="w-full" />
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
                                    <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
                                </div>
                            </div>
                        </div>
                        {/* Close Button */}
                        {/* <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setVisible(false)}
                            className="rounded-full"
                        >
                            <X className="h-4 w-4" />
                        </Button> */}
                    </div>
                )}
            </div>
        </main>
    );
}
