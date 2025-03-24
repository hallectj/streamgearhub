import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MainLayout from '@/layouts/MainLayout';
import StreamerSetup from '@/components/StreamerSetup';

interface StreamerPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: StreamerPageProps): Promise<Metadata> {
  // This would eventually fetch from WordPress
  if (params.slug === 'xqc') {
    return {
      title: "xQc's Streaming Setup | StreamGearHub",
      description: "Discover the gear and equipment xQc uses for streaming",
    };
  }
  
  return {
    title: 'Streamer Setup | StreamGearHub',
    description: 'Discover the gear and equipment used by popular streamers',
  };
}

export default function StreamerPage({ params }: StreamerPageProps) {
  // This would eventually fetch from WordPress
  if (params.slug === 'xqc') {
    // In the xqcSetup object, add the info property:
    const xqcSetup = {
      name: "Félix 'xQc' Lengyel",
      image: "https://pbs.twimg.com/profile_images/1702011519049904128/JXVYGukS_400x400.jpg",
      bio: "xQc is one of the most popular variety streamers known for his high-energy personality and competitive gaming. A former Overwatch pro, he now entertains millions with his reactions, gameplay, and Just Chatting content.",
      platforms: [
        {
          name: "Twitch",
          url: "https://www.twitch.tv/xqc",
          icon: "/images/platforms/twitch.svg"
        },
        {
          name: "Kick",
          url: "https://kick.com/xqc",
          icon: "/images/platforms/kick.svg"
        },
        {
          name: "YouTube",
          url: "https://www.youtube.com/channel/UCmDTrq0LNgPodDOFZiSbsww",
          icon: "/images/platforms/youtube.svg"
        },
        {
          name: "X (Twitter)",
          url: "https://twitter.com/xqc",
          icon: "/images/platforms/twitter.svg"
        }
      ],
      equipment: {
        audio: [
          {
            name: "Shure SM7B",
            description: "Dynamic microphone with rich, broadcast-ready vocals and excellent background noise rejection",
            image: "/images/equipment/shure-sm7b.jpg",
            price: "$399.00",
            amazonLink: "https://www.amazon.com/Shure-SM7B-Dynamic-Microphone-Cardioid/dp/B0002E4Z8M",
            reviewLink: "/reviews/shure-sm7b-vocal-microphone-review"
          },
          {
            name: "Yamaha MG10XU",
            description: "10-channel mixing console with built-in effects and USB audio interface",
            image: "/images/equipment/yamaha-mg10xu.jpg",
            price: "$209.99",
            amazonLink: "https://www.amazon.com/Yamaha-MG10XU-10-Input-Stereo-Effects/dp/B00IBIVL30"
          },
          {
            name: "Rode PSA1 Boom Arm",
            description: "Professional studio boom arm with internal springs and 360-degree rotation",
            image: "/images/equipment/rode-psa1.jpg",
            price: "$129.00",
            amazonLink: "https://www.amazon.com/Rode-PSA1-Professional-Studio-Microphone/dp/B001D7UYBO"
          },
          {
            name: "HyperX Cloud II",
            description: "Gaming headset with 7.1 virtual surround sound and memory foam ear pads",
            image: "/images/equipment/hyperx-cloud-ii.jpg",
            price: "$99.99",
            amazonLink: "https://www.amazon.com/HyperX-Cloud-Gaming-Headset-Detachable/dp/B00SAYCXWG"
          }
        ],
        video: [
          {
            name: "Logitech Brio 4K",
            description: "Ultra HD webcam with 5x digital zoom and HDR support",
            image: "/images/equipment/logitech-brio.jpg",
            price: "$199.99",
            amazonLink: "https://www.amazon.com/Logitech-2017-Brio-4K-Webcam/dp/B01N5UOYC4"
          },
          {
            name: "Elgato HD60 S+",
            description: "External capture card with 4K60 HDR10 passthrough and 1080p60 capture",
            image: "/images/equipment/elgato-hd60s-plus.jpg",
            price: "$179.99",
            amazonLink: "https://www.amazon.com/Elgato-External-Capture-1080p60-ultra-low/dp/B07XB6VNLJ"
          },
          {
            name: "Elgato Key Light",
            description: "Professional LED panel with app control and adjustable color temperature",
            image: "/images/equipment/elgato-key-light.jpg",
            price: "$199.99",
            amazonLink: "https://www.amazon.com/Elgato-Key-Light-Professional-App-Enabled/dp/B07L6WT77H"
          }
        ],
        computer: [
          {
            name: "AMD Ryzen 9 7950X3D",
            description: "16-core, 32-thread CPU with 3D V-Cache technology for gaming performance",
            image: "/images/equipment/ryzen-7950x3d.jpg",
            price: "$699.99",
            amazonLink: "https://www.amazon.com/AMD-7950X-32-Thread-Unlocked-Processor/dp/B0BBHD5D8Y"
          },
          {
            name: "NVIDIA GeForce RTX 4090",
            description: "Flagship GPU with 24GB GDDR6X memory for extreme gaming and streaming",
            image: "/images/equipment/rtx-4090.jpg",
            price: "$1,599.99",
            amazonLink: "https://www.amazon.com/NVIDIA-GeForce-Founders-Graphics-GDDR6X/dp/B0BJFRT43X"
          },
          {
            name: "Corsair Dominator Platinum 128GB",
            description: "High-performance DDR5 RAM with RGB lighting and aluminum heat spreaders",
            image: "/images/equipment/corsair-dominator.jpg",
            price: "$599.99",
            amazonLink: "https://www.amazon.com/Corsair-Dominator-Ultra-Bright-Dual-Channel-Technology/dp/B0981L8Y89"
          },
          {
            name: "Lian-Li O11 Dynamic EVO",
            description: "Premium mid-tower case with excellent airflow and versatile configuration options",
            image: "/images/equipment/lian-li-o11.jpg",
            price: "$169.99",
            amazonLink: "https://www.amazon.com/LIAN-Dynamic-Gaming-Desktop-Computer/dp/B09SFFSC9D"
          }
        ],
        accessories: [
          {
            name: "SHW Electric Adjustable Desk",
            description: "Height-adjustable standing desk with memory presets and cable management",
            image: "/images/equipment/shw-desk.jpg",
            price: "$249.99",
            amazonLink: "https://www.amazon.com/SHW-Electric-Height-Adjustable-Computer/dp/B07MBR8N89"
          },
          {
            name: "Herman Miller Embody",
            description: "Ergonomic gaming chair designed for long streaming sessions with adaptive support",
            image: "/images/equipment/herman-miller-embody.jpg",
            price: "$1,695.00",
            amazonLink: "https://www.amazon.com/Herman-Miller-Embody-Chair-Rhythm/dp/B084MJMV1H"
          },
          {
            name: "Elgato Stream Deck XL",
            description: "32-key customizable LCD keypad for stream control and content creation",
            image: "/images/equipment/stream-deck-xl.jpg",
            price: "$249.99",
            amazonLink: "https://www.amazon.com/Elgato-Stream-Deck-XL-customizable/dp/B07RL8H55Z"
          }
        ]
      },
      info: `
            <article>
        <h1>xQc’s Streaming Setup (March 2025)</h1>
        <p>Based on a combination of reputable articles, visible cues from his streams, and reasonable assumptions corroborated by fan discussions and industry trends, here’s what appears to be xQc’s current streaming setup as of March 2025. Note that streamers often tweak their gear, so these details reflect the most consistent and widely reported information available. For the latest updates, viewers are encouraged to check xQc’s live streams or social media.</p>
        
        <ul>
            <li>
                <strong>Microphone</strong>: Likely a <a href="https://www.amazon.com/Shure-SM7B-Dynamic-Microphone-Cardioid/dp/B0002E4Z8M">Shure SM7B</a>, a dynamic mic renowned for its rich sound and noise rejection. Sources like <a href="https://www.streamscheme.com/xqcow-setup-and-streaming-gear/"><em>StreamScheme</em></a> list it as part of his setup, and it’s frequently spotted on his desk in Twitch VODs at <a href="https://www.twitch.tv/xqc"><em>twitch.tv/xqc</em></a>, often mounted on a <a href="https://www.amazon.com/Rode-PSA1-Professional-Studio-Microphone/dp/B001D7UYBO">Rode PSA1 Boom Arm</a> for flexibility.
            </li>
            <li>
                <strong>Audio Interface/Mixer</strong>: Appears to be a <a href="https://www.amazon.com/Yamaha-MG10XU-10-Input-Stereo-Effects/dp/B00IBIVL30">Yamaha MG10XU</a>, suggested by <a href="https://streamerfacts.com/xqc-streaming-setup/"><em>Streamerfacts</em></a>. This analog mixer aligns with his inferred preference for tactile controls over digital options like GoXLR, as hinted at in stream banter.
            </li>
            <li>
                <strong>Software</strong>: Almost certainly <a href="https://obsproject.com/">OBS Studio</a>, the go-to software for most streamers. Its use is supported by his fast-paced streaming style and mentions in Fossabot commands on his Twitch channel. (Note: OBS is free, so no Amazon link applies here.)
            </li>
            <li>
                <strong>Capture Card</strong>: Possibly an <a href="https://www.amazon.com/Elgato-External-Capture-1080p60-ultra-low/dp/B07XB6VNLJ">Elgato HD60 S+</a>, plausible for console streams on Kick, as noted by <a href="https://streamscharts.com/channels/xqc"><em>Streamscharts</em></a>. This aligns with visual evidence from his broadcasts and common streamer preferences.
            </li>
            <li>
                <strong>PC Components</strong>:
                <ul>
                    <li><strong>CPU</strong>: Believed to be an <a href="https://www.amazon.com/AMD-7950X-32-Thread-Unlocked-Processor/dp/B0BBHD5D8Y">AMD Ryzen 9 7950X</a>, an upgrade from older specs that fits his high-performance needs post-2024 Kick deal, per <a href="https://streamscharts.com/channels/xqc"><em>Streamscharts</em></a>.</li>
                    <li><strong>GPU</strong>: Likely an <a href="https://www.amazon.com/NVIDIA-GeForce-Founders-Graphics-GDDR6X/dp/B0BJFRT43X">NVIDIA GeForce RTX 4090</a> (Founders Edition linked), a logical step up from his previous RTX 3090Ti, based on fan speculation trending on X and his substantial budget.</li>
                    <li><strong>RAM</strong>: Reportedly <a href="https://www.amazon.com/Corsair-Dominator-Ultra-Bright-Dual-Channel-Technology/dp/B0981L8Y89">Corsair Dominator Platinum RGB 128GB (4x32GB)</a>, as per <a href="https://www.streamscheme.com/xqcow-setup-and-streaming-gear/"><em>StreamScheme</em></a>. While excessive for most, it’s consistent with his over-the-top style.</li>
                    <li><strong>Case</strong>: Possibly a <a href="https://www.amazon.com/LIAN-Dynamic-Gaming-Desktop-Computer/dp/B09SFFSC9D">Lian-Li O11 Dynamic EVO</a>, inferred from room tour aesthetics seen in clips and its popularity among high-end streamers.</li>
                </ul>
            </li>
            <li>
                <strong>Webcam</strong>: Seems to be a <a href="https://www.amazon.com/Logitech-2017-Brio-4K-Webcam/dp/B01N5UOYC4">Logitech Brio 4K</a>, visible in stream footage covered by <a href="https://www.essentiallysports.com/esports-news-xqc-leaves-viewers-disgusted-after-showing-his-unhygienic-streaming-setup/"><em>EssentiallySports</em></a> and confirmed by <a href="https://www.streamscheme.com/xqcow-setup-and-streaming-gear/"><em>StreamScheme</em></a>.
            </li>
            <li>
                <strong>Headset</strong>: Likely a <a href="https://www.amazon.com/HyperX-Cloud-Gaming-Headset-Detachable/dp/B00SAYCXWG">HyperX Cloud II</a>, often seen as his audio backup, per <a href="https://streamerfacts.com/xqc-streaming-setup/"><em>Streamerfacts</em></a> and visible in older streams.
            </li>
            <li>
                <strong>Desk</strong>: Potentially an <a href="https://www.amazon.com/SHW-Electric-Height-Adjustable-Computer/dp/B07MBR8N89">SHW Electric Adjustable Desk</a> (55x28-inch model linked as an example), a reasonable assumption based on his sitting/standing streams and its popularity among streamers, though not directly confirmed.
            </li>
        </ul>

        <p><em>Sources and visuals suggest this setup, but for real-time confirmation, check xQc’s live streams on <a href="https://www.twitch.tv/xqc">Twitch</a> or posts on <a href="https://x.com/xqc">X</a>.</em></p>
    </article>
      `
    };
    
    return (
      <MainLayout>
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <StreamerSetup {...xqcSetup} />
        </div>
      </MainLayout>
    );
  }
  
  // If we don't have data for this streamer, show 404
  notFound();
}