import { useEditorEngine } from '@/components/store/editor';
import { CodeBlockProcessor } from '@onlook/ai';
import { useMemo } from 'react';
import { CollapsibleCodeBlock } from './collapsible-code-block';

export const CodeChangeDisplay = ({
    path,
    content,
    messageId,
    applied,
    isStream = false,
}: {
    path: string;
    content: string;
    messageId: string;
    applied: boolean;
    isStream?: boolean;
}) => {
    const editorEngine = useEditorEngine();
    const { search: searchContent, replace: replaceContent } = useMemo(
        () => CodeBlockProcessor.parseDiff(content)[0] ?? { search: '', replace: '' },
        [content],
    );

    const applyChange = async () => {
        await editorEngine.chat.code.applyCode(messageId);
    };

    const rejectChange = async () => {
        await editorEngine.chat.code.revertCode(messageId);
    };

    return (
        <div className="group relative">
            <CollapsibleCodeBlock
                path={path}
                content={content}
                searchContent={searchContent}
                replaceContent={replaceContent}
                applied={applied}
                isStream={isStream}
                onApply={applyChange}
                onRevert={rejectChange}
            />
        </div>
    );
};

export default CodeChangeDisplay;
