declare module 'otter.ai-api' {
	import OtterApi from '@/utils/otter.ai-api/index';

	interface User {
		id: string;
		// Add other user properties as needed
	}

	interface Speech {
		speech_id: string;
		start_time: number;
		end_time: number;
		modified_time: number;
		deleted: boolean;
		duration: number;
		title: string;
		summary: string;
		from_shared: boolean;
		shared_with: any[]; // You can replace 'any' with the appropriate type if you have more details about the shared_with format
		unshared: boolean;
		shared_by: any; // Replace 'any' with the appropriate type if you have more details about the shared_by format
		owner: any; // Replace 'any' with the appropriate type if you have more details about the owner format
		shared_groups: any[]; // Replace 'any' with the appropriate type if you have more details about the shared_groups format
		can_edit: boolean;
		can_comment: boolean;
		is_read: boolean;
		process_finished: boolean;
		upload_finished: boolean;
		hasPhotos: number;
		download_url: string;
		transcript_updated_at: number;
		images: any[]; // Replace 'any' with the appropriate type if you have more details about the images format
		speakers: any[]; // Replace 'any' with the appropriate type if you have more details about the speakers format
		word_clouds: any[]; // Replace 'any' with the appropriate type if you have more details about the word_clouds format
		live_status: string;
		live_status_message: string;
		public_share_url: string | null;
		folder: any; // Replace 'any' with the appropriate type if you have more details about the folder format
		created_at: number;
	}

	class OtterApi {
		constructor(options: { email: string; password: string });
		init: () => Promise<void>;
		getSpeeches: () => Promise<Array<any>>;
		getSpeech: (speech_id: string) => Promise<any>;
		speechSearch: (query: string) => Promise<Array<any>>;
		validateUploadService: () => Promise<void>;
		uploadSpeech: (file: any) => Promise<any>;
	}

	export default OtterApi;
}
